
import { XHResponseStatus } from './xhResponseStatus';
import { service } from 'lib/di';

@service()
export class XHResponse {

    constructor(
        private data: { [key: string]: any } = {},
        private status: XHResponseStatus = XHResponseStatus.Success,
        private error?: string) {
    }

    getData = (name?: string): any => {
        if (!name) {
            return this.data;
        } else if (name in this.data) {
            return this.data[name];
        } else {
            return undefined;
        }
    }

    getStatus = (): XHResponseStatus => {
        return this.status;
    }

    getError = (): string | undefined => {
        return this.error;
    }
}