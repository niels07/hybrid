import { Dispatcher, PolyfillLoader } from 'core/app';
import { XHRequestHandler } from 'core/http';
import { ViewManager } from 'core/view';
import { inject } from 'lib/di';
import { Promise } from 'core/promise';
import { PromiseFactory } from 'core/promise';

export class AdminDispatcher implements Dispatcher {

    constructor(
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(ViewManager) private viewManager: ViewManager,
        @inject(PolyfillLoader) private polyfillLoader: PolyfillLoader,
        @inject(PromiseFactory) private promiseFactory: PromiseFactory) {
    }

    private logoutHandler = (): void => {
        this.requestHandler.sendRequest({
            'route': 'admin',
            'action': 'logout'
        }).then(r => {
            return this.viewManager.loadView({ name: 'admin/login' });
        });
    }

    invoke = () => {
        this.polyfillLoader.load('customEvent').then(v => {
            return this.requestHandler.sendRequest({
                'route': 'admin',
                'action': 'verifyLogin',
            });
        }).then(r => {
            var authorized = r.getData('authorized');
            var viewName = (authorized === true) ? 'products' : 'login';
            return this.viewManager.loadView({ name: 'admin/' + viewName });
        }).then(v => {
            var logoutBtn = document.getElementById('logout-button');
            if (logoutBtn) {
                logoutBtn.onclick = this.logoutHandler;
            }
        }).except(e => {
            console.log(e);
        });
    }
}
