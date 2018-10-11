import { XHRequestFactory } from './xhRequestFactory';
import { XHResponseFactory } from './xhResponseFactory';
import { XHResponse } from './xhResponse';
import { XHResponseStatus } from './xhResponseStatus';
import { Request } from './request';
import { Factory, singleton, inject } from 'lib/di';
import { PromiseFactory, Promise } from 'core/promise';

type RequestData = { [index: string]: any } | HTMLFormElement;

interface RequestArgs {
    route: string;
    data?: RequestData;
    action: string;
    method?: string;
    path?: string;
}

@singleton()
export class XHRequestHandler {

    private loadingThreshold: number = 1000;

    constructor(
        @inject(XHRequestFactory) private requestFactory: XHRequestFactory,
        @inject(XHResponseFactory) private responseFactory: XHResponseFactory,
        @inject(PromiseFactory) private promiseFactory: PromiseFactory) {
    }

    private getRequestString = (route: string, action: string, data: { [index: string]: any }): string => {
        var requestStr = `route=${route}&action=${action}`;
        for (var arg in data) {
            requestStr += `&${arg}=${data[arg]}`;
        }
        return requestStr;
    }

    private loadObject = (formData: FormData, obj: { [index: string]: any }): void => {
        var data: { [index: string]: any } = {};
        for (var i in obj) {
            var item = obj[i];
            if (item instanceof Blob) {
                formData.append(i, item);
            } else {
                data[i] = item;
            }
        }
        var dataStr = JSON.stringify(data);
        formData.append('data', dataStr);
    }

    private loadForm = (formData: FormData, form: HTMLFormElement): void => {
        var result = null;
        var items = form.elements;
        var data: { [index: string]: any } = {};

        for (var i = 0; i < items.length; i++) {
            var item = <{ [index: string]: any }>items[i];
            var tagName = item.tagName.toLowerCase();

            if ((tagName == 'select' || tagName == 'input' || tagName == 'textarea') && 'name' in item) {
                var name = item['name'];
                data[item['name']] = item['value'];
                continue;
            }

            if (tagName != 'file') {
                continue;
            }

            var fileInput = <HTMLInputElement>item;
            if (!fileInput.files || fileInput.files.length == 0) {
                continue;
            }

            var file = fileInput.files[0];
            formData.append(fileInput.name, file);
        }
        var dataStr = JSON.stringify(data);
        formData.append('data', JSON.stringify(data));
    }

    private isForm = (data: any): boolean => {
        return data
            && 'tagName' in data
            && data['tagName'].toLowerCase() === 'form';
    }

    private loadRequestData = (formData: FormData, data: object): void => {
        if (this.isForm(data)) {
            this.loadForm(formData, <HTMLFormElement>data);
        } else {
            this.loadObject(formData, data);
        }
    }

    private prepareRequest = (route: string, action: string, data?: RequestData) => {
        var formData = new FormData();
        if (data) {
            this.loadRequestData(formData, data);
        }
        formData.append('route', route);
        formData.append('action', action);
        formData.append('isXHR', 'true');
        return formData;
    }

    private parseData = (dataStr: string): any => {
        var data;
        try {
            data = JSON.parse(dataStr);
        } catch {
            return dataStr;
        }
        if (typeof (data) in ['string', 'number']) {
            return data;
        }
        for (var key in data) {
            var value = data[key];
            try {
                value = JSON.parse(value);
                data[key] = value;
            } catch { }
        }
        return data;
    }

    private getResponse = (xhr: Request): XHResponse => {
        var responseStr: any = xhr.getResponse();

        if (!responseStr) {
            return this.responseFactory.create();
        }

        var responseObj;
        try {
            responseObj = JSON.parse(responseStr);
        } catch (e) {
            throw Error('received invalid response: ' + responseStr);
        }
        var data;
        var status = XHResponseStatus.Success;

        if ('data' in responseObj) {
            data = this.parseData(responseObj['data']);
        }
        var error = responseObj['error'];
        return this.responseFactory.create(data, error);
    }

    public getRequest(key: string): string | undefined {
        var url = location.href;
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + key + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == undefined ? undefined : results[1];
    }

    sendRequest = (args: RequestArgs): Promise<XHResponse> => {
        if (!args.path) {
            args.path = 'index.php';
        }

        var xhr = this.requestFactory.create(args.path, args.method);
        var timeout = setTimeout((): void => {
            document.body.classList.add('loading');
        }, this.loadingThreshold);

        return this.promiseFactory.create((resolve, reject) => {
            var onLoad = () => {
                clearTimeout(timeout);
                document.body.classList.remove('loading');
                var response = this.getResponse(xhr);
                resolve(response);
            }

            var onError = () => {
                clearTimeout(timeout);
                document.body.classList.remove('loading');
                var response = this.responseFactory.create(xhr.getResponse());
                reject(response.getError());
            }

            var data = this.prepareRequest(args.route, args.action, args.data);
            xhr.send(data, onLoad, onError);
        });
    }
}
