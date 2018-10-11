import { EventArgs } from 'core/event';
import { StoreSelection } from './store/storeSelection';
import { inject } from 'lib/di';

import { ViewManager, callback, onLoad, PageView } from 'core/view';

export class StoreView extends PageView {
    public constructor(@inject(StoreSelection) private storeSelection: StoreSelection) {
        super('page/store');
    }

    @onLoad()
    protected loadPage = (): void => {
        this.storeSelection.setActive(false);
    }

    @callback()
    private loadCategories = (args: EventArgs): void => {
        this.storeSelection.loadView('categories', args);
    }
}
