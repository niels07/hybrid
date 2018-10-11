import { EventArgs } from 'core/event';
import { StoreSelection } from './storeSelection';
import { BaseView, ViewManager, onLoad, callback } from 'core/view';
import { ConfigCollection } from 'core/config';
import { inject } from 'lib/di';

export class ProductsView extends BaseView {

    constructor(
        @inject(ViewManager) private viewManager: ViewManager,
        @inject(StoreSelection) private storeSelection: StoreSelection,
        @inject(ConfigCollection) private config: ConfigCollection) {

        super('page/store/products');
    }

    private loadProductSelection = (): void => {
        this.storeSelection.setActive();
        this.storeSelection.setState(2);
        this.storeSelection.update('#store-products');
        var mt = this.config.get('mobileThreshold');
        if (mt && screen.width <= mt) {
            this.viewManager.hideView('page/store/categories');
        }
    }

    private checkCategoriesView = (): void => {
        var categoriesView = this.viewManager.getView('page/store/categories');

        if (categoriesView.isActive()) {
            this.loadProductSelection();
            return;
        }

        categoriesView.load({
            onLoad: this.loadProductSelection,
            args: {},
            handleEvents: false
        });
    }

    @onLoad()
    loadView = (): void => {
        //this.storeSelection.setActive();
        //this.storeSelection.setState(2);
        //this.storeSelection.update('#store-products');
        this.checkCategoriesView();
    }

    @callback()
    loadProduct = (args: EventArgs): void => {
        this.storeSelection.setActive(false);
        this.viewManager.loadView({name: 'page/store/product', args: args});
    }

    @callback()
    loadCategories = (args: EventArgs): void => {
        this.storeSelection.loadView('categories', args);
    }
}
