
import { ServiceFactory, singleton } from 'lib/di';
import { XHResponse } from './xhResponse';
import { XHResponseStatus } from './xhResponseStatus';

@singleton()
export class XHResponseFactory extends ServiceFactory {
    constructor() {
        super(XHResponse);
    }

    create(): XHResponse;
    create(error: string): XHResponse;
    create(data: { [key: string]: any }, error: string): XHResponse;
    create(data?: { [key: string]: any } | string, error?: string) : XHResponse {
        if (!data) {
            error = undefined;
            data = {};
        } else if (typeof (data) === 'string') {
            error = data;
            data = {};
        }
        return super.create(data, error);
    }
}
