
import { Factory } from 'lib/di';
import { XHRequestHandler, XHResponse } from 'core/http';
import { ModelManager } from './modelManager';
import { Promise } from 'core/promise';

export class GenericModelManager<T> implements ModelManager<T>  {
    constructor(
        private requestHandler: XHRequestHandler,
        private modelFactory: Factory,
        private requestRoute: string) {
    }

    private error = (message: string, response: XHResponse): void => {
        var error = response.getError();
        if (error) {
            message += ': ' + error;
        }
        throw Error(message);
    }

    save = (data: object): Promise<T> => {
        return this.requestHandler.sendRequest({
            route: this.requestRoute,
            action: 'save',
            data: data,
        }).then(r => {
            var data = r.getData('item');
            var model = this.modelFactory.create(data);
            return model;
        }, r => {
            this.error('failed to save item', r);
        });
    }

    delete = (id: number): Promise<T> => {
        return this.requestHandler.sendRequest({
            route: this.requestRoute,
            action: 'delete',
            data: { 'id': id }
        }).then(r => {
            var data = r.getData('item');
            var category = this.modelFactory.create(data);
            return category;
        }, r => {
            this.error('could not delete item', r);
        });
    }

    fetch = (): Promise<Array<T>> => {
        return this.requestHandler.sendRequest({
            route: this.requestRoute,
            action: 'getAll',
            data: {}
        }).then(r => {
            var data: Array<any> = r.getData('items');
            var items = new Array<T>();
            for (var i = 0; i < data.length; i++) {
                var item = this.modelFactory.create(data[i]);
                items.push(item);
            }
            return items;
        }, r => {
            this.error('failed to fetch items', r);
        });
    }
}