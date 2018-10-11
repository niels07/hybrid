import { Dispatcher } from 'core/app';
import { XHRequestHandler } from 'core/http';
import { ViewManager } from 'core/view';
import { inject } from 'lib/di';

export class PageDispatcher implements Dispatcher {

    constructor(
        @inject(ViewManager) private viewManager: ViewManager) {
    }

    invoke = () => {
        this.viewManager.loadView().then(v => {
            return this.viewManager.loadView({ 'name': 'page/footer' });
        }).except(e => {
            throw new Error(e);
        });
    }
}
