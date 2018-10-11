import { ViewFactory } from './viewFactory';
import { BaseView } from './baseView';
import { XHRequestHandler } from '../http';
import { singleton, inject } from 'lib/di';

@singleton()
export class ViewCollection {

    private views: { [key: string]: BaseView };

    constructor(
        @inject(ViewFactory) private viewFactory: ViewFactory,
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler) {
        this.views = {};
    }

    contains(name: string): boolean {
        return name in this.views;
    }

    get = (name: string): BaseView => {
        if (!this.contains(name)) {
            this.views[name] = this.viewFactory.create(BaseView, name);
            this.views[name]['__requestHandler'] = this.requestHandler;
        }
        return this.views[name];
    }

    set = (name: string, item: { new (...args: any[]): BaseView } | BaseView): void => {
        if (typeof item === 'function') {
            this.views[name] = this.viewFactory.create(item);
        } else {
            this.views[name] = item;
        }
        this.views[name]['__requestHandler'] = this.requestHandler;
    }

    each(f: (item: BaseView) => void): void {
        for (var i in this.views) {
           f(this.views[i]); 
        }
    }

    toArray = (): Array<BaseView> => {
        return Object.keys(this.views).map(key => this.views[key]);
    }
}

