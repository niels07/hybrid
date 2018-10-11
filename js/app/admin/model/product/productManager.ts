import { XHRequestHandler } from 'core/http';
import { GenericModelManager } from '../genericModelManager';
import { ProductModel } from './productModel';
import { ProductFactory } from './productFactory';
import { singleton, inject } from 'lib/di';

@singleton()
export class ProductManager extends GenericModelManager<ProductModel> {

    constructor(
        @inject(XHRequestHandler) requestHandler: XHRequestHandler,
        @inject(ProductFactory) productFactory: ProductFactory) {
        super(requestHandler, productFactory, 'admin/product');
    }
}
 