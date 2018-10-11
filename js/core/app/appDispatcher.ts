import { Dispatcher } from './dispatcher';
import { ViewManager } from '../view';
import { inject } from 'lib/di';

export class AppDispatcher implements Dispatcher {

    public constructor(@inject(ViewManager) private viewManager: ViewManager) {

    }

    public invoke(): void {
        this.viewManager.loadView();
    }
}
