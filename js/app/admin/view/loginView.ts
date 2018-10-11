import { PageView, ViewManager } from 'core/view';
import { callback, onLoad } from 'core/view';
import { XHRequestHandler } from 'core/http';
import { inject } from 'lib/di';

export class LoginView extends PageView {
    constructor(
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(ViewManager) private viewManager: ViewManager) {
        super('admin/login');
    }

    @callback()
    private login = (): void => {
        var form = <HTMLFormElement>document.getElementById('login-form');
        this.requestHandler.sendRequest({
            'data': form,
            'action': 'login',
            'route': 'admin'
        }).then(r => {
            if (r['data']['authorized'] == true) {
                this.viewManager.loadView({ 'name': 'admin/products' });
            }
        });
    }
}
