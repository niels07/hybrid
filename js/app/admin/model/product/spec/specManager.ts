import { XHRequestHandler } from 'core/http';
import { GenericModelManager } from '../../genericModelManager';
import { SpecModel } from './specModel';
import { SpecFactory } from './specFactory';
import { singleton, inject } from 'lib/di';

@singleton()
export class SpecManager extends GenericModelManager<SpecModel> {

    constructor(
        @inject(XHRequestHandler) requestHandler: XHRequestHandler,
        @inject(SpecFactory) specFactory: SpecFactory) {
        super(requestHandler, specFactory, 'admin/product');
    }
}
 