import { BaseView } from './baseView';
import { ViewLoader } from './viewLoader';
import { PageView } from './pageView';
import { ViewCollection } from './viewCollection';
import { EventArgs } from '../event/eventArgs';
import { EventHandler } from '../event/eventHandler';
import { singleton, inject } from 'lib/di';
import { Promise, PromiseFactory } from 'core/promise';

interface LoadViewArgs {
    name?: string;
    args?: { [key: string]: any };
}

@singleton()
export class ViewManager {
    private defaultViewName: string;

    constructor(
        @inject(ViewCollection) private viewCollection: ViewCollection,
        @inject(ViewLoader) private viewLoader: ViewLoader,
        @inject(PromiseFactory) private promiseFactory: PromiseFactory) {
        this.loadNavs();
    }

    private getNavClickHandler = (name: string) => {
        return () => {
            this.loadView({ name: name, args: {} });
            return false;
        }
    }

    private loadNav = (el: HTMLElement): void => {
        var a = <HTMLAnchorElement>el;
        var name = el.getAttribute('data-nav');
        a.href = 'javascript:void(0)';
        if (name) {
            a.onclick = this.getNavClickHandler(name);
        }
    }

    private loadNavs = (): void => {
        var navs = document.querySelectorAll('[data-nav]');
        for (var i = 0; i < navs.length; i++) {
            this.loadNav(<HTMLElement>navs[i]);
        }
    }

    setDefaultView = (viewName: string): void => {
        this.defaultViewName = viewName;
        this.viewLoader.setDefaultView(viewName);
    }

    getView = (name: string): BaseView => {
        return this.viewCollection.get(name);
    }

    registerView = (name: string, type: { new(...args: any[]): any }): void => {
        this.viewCollection.set(name, type);
    }

    viewActive = (name: string): boolean => {
        if (!this.viewCollection.contains(name)) {
            return false;
        }
        var view = this.viewCollection.get(name);
        return view.isActive();
    }

    refreshView = (views: Array<BaseView>, index: number) => {
        if (index == views.length) {
            return;
        }
        var view = views[index++];
        if (!view.isActive()) {
            this.refreshView(views, index);
        }
        view.load({
            onLoad: (): void => {
                this.refreshView(views, index);
            },
            handleEvents: true
        });
    }

    refreshViews = (): void => {
        var views = this.viewCollection.toArray();
        this.refreshView(views, 0);
    }

    hideView = (name: string): void => {
        if (this.viewCollection.contains(name)) {
            var view = this.viewCollection.get(name);
            view.hide();
        }
    }

    hideViews = (...views: string[]): void => {
        for (var i = 0; i < views.length; i++) {
            this.hideView(views[i]);
        }
    }

    viewLoaded(name: string) {
        return this.getView(name).isLoaded();
    }

    private hideOtherPages = (view: BaseView): void => {
        this.viewCollection.each((view2: BaseView) => {
            if (view2 instanceof PageView && view2 !== view && view2.isActive()) {
                view2.hide();
            }
        });
    }

    loadView = (loadViewArgs?: LoadViewArgs): Promise<BaseView> => {
        var name: string | undefined;
        var args: { [key: string]: any } | undefined;

        if (loadViewArgs) {
            name = loadViewArgs.name;
            args = loadViewArgs.args;
        }

        var view = loadViewArgs && loadViewArgs.name ? this.getView(loadViewArgs.name) : undefined;
        return this.promiseFactory.create((resolve, reject) => {
            this.viewLoader.load(name, args, () => {
                if (view instanceof PageView) {
                    this.hideOtherPages(view);
                }
                this.loadNavs();
                if (!view) {
                    view = this.getView(this.defaultViewName);
                }
                resolve(view);
            });
        });
    }
}

