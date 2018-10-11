import { Request } from './request';
import { service, inject } from 'lib/di';
import { XHResponse } from './xhResponse';

type XHRHandlerCallback = (xhr: XHRequest) => void;

@service()
export class XHRequest implements Request {
    private xhr: XMLHttpRequest;
    private async: boolean = true;
    private isOpen: boolean = false;
    private method: string;
    private response: string;

    private onProgress: XHRHandlerCallback;
    private onLoad: XHRHandlerCallback;
    private onError: XHRHandlerCallback;

    constructor(
        private target: string,
        method: string = 'POST',
        async: boolean = true) {
        this.xhr = 'XMLHttpRequest' in window
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        this.method = method;
        this.async = async;
        this.xhr.onreadystatechange = this.handleState;
    }

    setOnProgress(handle: XHRHandlerCallback): void {
        this.onProgress = handle;
    }

    setOnLoad(handle: XHRHandlerCallback): void {
        this.onLoad = handle;
    }

    setOnError(handle: XHRHandlerCallback): void {
        this.onError = handle;
    }

    open(): void {
        if (this.isOpen) { return; }
        this.xhr.open(this.method, this.target, this.async);
        this.isOpen = true;
    }

    getResponse(): any {
        return this.response;
    }

    private handleStatus = () => {
        if (this.xhr.status === 200) {
            this.response = this.xhr.responseText;
            if (this.onLoad) {
                this.onLoad(this);
            }
        } else {
            this.response = this.xhr.statusText;
            if (this.onError) {
                this.onError(this);
            }
        }
    }

    private handleState = (): void => {
        switch (this.xhr.readyState) {
            case XMLHttpRequest.HEADERS_RECEIVED:
                break;

            case XMLHttpRequest.LOADING:
                if (this.onProgress) {
                    this.onProgress(this);
                }
                break;

            case XMLHttpRequest.DONE:
                this.handleStatus();
                break;
        }
    }

    send = (data?: any, onLoad?: XHRHandlerCallback, onError?: XHRHandlerCallback): void => {
        if (onLoad) {
            this.onLoad = onLoad;
        }
        if (onError) {
            this.onError = onError;
        }
        this.open();
        this.xhr.send(data);
    }
}

