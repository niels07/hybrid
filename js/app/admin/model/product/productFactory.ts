import { ServiceFactory, singleton, inject } from 'lib/di';
import { ProductModel } from './productModel';
import { ProductModelInit } from './productModelInit';

@singleton()
export class ProductFactory extends ServiceFactory {

    public constructor() {
        super(ProductModel);
    }

    create(init: ProductModelInit): ProductModel {
        return super.create(init);
    }
}