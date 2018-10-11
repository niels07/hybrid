import { XHRequestHandler } from 'core/http';
import { EventHandler } from 'core/event';
import { inject, singleton } from 'lib/di';
import { ModelManager } from '../modelManager';
import { CategoryFactory } from './categoryFactory';
import { CategoryModel } from './categoryModel';
import { Promise } from 'core/promise';

@singleton()
export class CategoryManager implements ModelManager<CategoryModel> {

    constructor(
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(CategoryFactory) private categoryFactory: CategoryFactory) {
    }

    save = (data: object): Promise<CategoryModel> => {
        return this.requestHandler.sendRequest({
            route: 'admin/category',
            action: 'save',
            data: data
        }).then(r => {
            var item = r.getData('item');
            var category = this.categoryFactory.create(item);
            return category;
        }, e => {
            throw Error('failed to save item: ' + e);
        });
    }

    delete = (id: number): Promise<CategoryModel>=> {
        return this.requestHandler.sendRequest({
            route: 'admin/category',
            action: 'delete',
            data: { 'id': id }
        }).then(r => {
            var data = r['data']['item'];
            var category = this.categoryFactory.create(data);
            return category;
        }, e => {
            throw Error('could not delete item: ' + e);
        });
    }

    fetch = (): Promise<Array<CategoryModel>> => {
        return this.requestHandler.sendRequest({
            route: 'admin/category',
            action: 'getAll',
            data: {},
        }).then(r => {
            var data: Array<any> = r['data']['items'];
            var categories = new Array<CategoryModel>();
            for (var i = 0; i < data.length; i++) {
                var category = this.categoryFactory.create(data[i]);
                categories.push(category);
            }
            return categories;
        }, e => {
            throw Error('failed to fetch items: '+  e);
        });
    }
}
