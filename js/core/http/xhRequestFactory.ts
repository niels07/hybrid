import { ServiceFactory, singleton } from 'lib/di';
import { XHRequest } from './xhRequest';

@singleton()
export class XHRequestFactory extends ServiceFactory {
    constructor() {
        super(XHRequest);
    }

    create(target: string, method: string = 'POST', async: boolean = true): XHRequest {
        return super.create(target, method, async);
    }
}
