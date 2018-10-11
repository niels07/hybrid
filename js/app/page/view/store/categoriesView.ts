import { EventArgs } from 'core/event';
import { BaseView, onLoad, callback } from 'core/view';
import { StoreSelection } from './storeSelection';
import { inject } from 'lib/di';

export class CategoriesView extends BaseView {

    public constructor(@inject(StoreSelection) private storeSelection: StoreSelection) {
        super('page/store/categories');
    }

    @onLoad()
    loadView = (): void => {
        this.storeSelection.setActive();
        this.storeSelection.setState(1);
        this.storeSelection.update('#store-categories');
    }


    @callback()
    loadProducts = (args: EventArgs): void => {
        this.storeSelection.loadView('products', args);
    }
}
