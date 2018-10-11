import { XHRequestHandler } from 'core/http';
import { GenericModelManager } from '../genericModelManager';
import { StoreModel } from './storeModel';
import { StoreFactory } from './storeFactory';
import { singleton, inject } from 'lib/di';

@singleton()
export class StoreManager extends GenericModelManager<StoreModel> {

    constructor(
        @inject(XHRequestHandler) requestHandler: XHRequestHandler,
        @inject(StoreFactory) storeFactory: StoreFactory) {
        super(requestHandler, storeFactory, 'admin/store');
    }
}
 