import { BaseView } from './baseView';
import { ViewCollection } from './viewCollection';
import { EventArgs } from '../event/eventArgs';
import { EventHandler } from '../event/eventHandler';
import { singleton, inject } from 'lib/di';

@singleton()
export class ViewLoader {

    private index: number;
    private views: Array<string>;
    private view: BaseView;
    private viewName: string;
    private viewArgs: EventArgs;
    private defaultView: BaseView;
    private onLoad: EventHandler | undefined;

    public constructor(@inject(ViewCollection) private viewCollection: ViewCollection) {

    }

    setDefaultView = (viewName: string) => {
        this.defaultView = this.viewCollection.get(viewName);
    }
    
    private getUrlParams() {
        var match;
        var pl = /\+/g;
        var search = /([^&=]+)=?([^&]*)/g;
        var decode = (s: string) => {
            return decodeURIComponent(s.replace(pl, " ")); 
        };
        var query  = window.location.search.substring(1);
        var params: { [index: string]: any } = {};

        while (match = search.exec(query)) {
            params[decode(match[1])] = decode(match[2]);
        }
        return params;
    }
    
    private findViewPath(): string {
        return window.location.pathname
            .replace(/\/+/g, '\/')
            .replace(/\/$|^\//g, '');
    }

    private loadDefault = (): void => {
        if (this.defaultView) {
            this.defaultView.load({
                onLoad: this.onLoad,
                args: this.viewArgs,
                handleEvents: true
            }); 
        }
    }

    private getChildViewNames(view: BaseView): Array<string> {
        var el = view.getElement();
        var children = el.querySelectorAll(`[data-view-parent="${view.getName()}"]`);
        var views = [];
        for (var i = 0; i < children.length; i++) {
            el = <HTMLElement>children[i];
            var attr = el.getAttribute('data-view');
            if (attr) {
                var viewName = attr;
                views.push(viewName);
            }
        }
        return views;
    }

    private loadChildView = (name: string, onLoad: () => void): void => {
        if (!name) {
            return; 
        }
        
        this.index = 1;
        this.views = name.split('/');

        if (this.views.length < 2) {
            return;
        }
        this.viewName = this.views[0];
        this.loadNext();
    }
    
    private loadChildViews = (onLoad?: EventHandler, views?: Array<string>,  index: number = 0): void => {
        if (!views) {
            views = this.getChildViewNames(this.view);
        }
        if (views.length == index) {
            if (onLoad) {
                onLoad();
            }
            return;
        }
        var viewName = views[index];
        this.loadChildView(viewName, () => {
            this.loadChildViews(onLoad, views, index + 1);
        });
    }

    private loadView = (): void => {
        this.view.load({
            onLoad: e => {
                this.loadChildViews(() => {
                    this.onLoad!(e);
                });
            },
            args: this.viewArgs,
            handleEvents: true
        });
    }

    private loadNext = (): void => {
        if (this.view) {
            this.view.deleteEventHandler('load', this.loadNext);
        }
        
        this.viewName += '/' + this.views[this.index];
        this.view = this.viewCollection.get(this.viewName);

        if (this.view.getElement() == null) {
            this.loadDefault();
            return;
        }

        if (++this.index == this.views.length) {
            this.loadView();
            return;
        }

        if (this.view.isActive()) {
            this.loadNext();
        } else {
            this.view.addEventHandler('load', this.loadNext);
            this.loadView();
        }
    }

    load = (name?: string, args?: EventArgs, onLoad?: EventHandler): void => {
        this.onLoad = onLoad;
        if (!name) {
            name = this.findViewPath();
        }
        
        this.viewArgs = !args ? this.getUrlParams() : args;
        this.index = 1;
        this.views = name.split('/');

        if (this.views.length < 2) {
            this.loadDefault();
            return;
        }
        this.viewName = this.views[0];
        this.loadNext();
    }
}
