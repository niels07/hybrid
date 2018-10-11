import { BaseView, callback, ViewManager } from 'core/view';
import { EventArgs } from 'core/event';
import { inject } from 'lib/di';
import { Promise } from 'core/promise';

export class FooterView extends BaseView {
    constructor( @inject(ViewManager) private viewManager: ViewManager) {
        super('page/footer');
    }

    private loadCategory = (id: number): Promise<void> => {
        return this.viewManager.loadView({
            name: 'page/store/products',
            args: { 'categoryId': id }
        }).then(v => {
            var opener = document.getElementById('store-selection-open');
            if (opener) {
                opener.style.visibility = 'hidden';
            }
            window.scrollTo(0, 0);
        });
    }

    @callback()
    showStore = (args: EventArgs): void => {
        this.viewManager.loadView({ 'name': 'page/stores' });
    }

    @callback()
    showCategory = (args: EventArgs): void => {
        this.viewManager.loadView({
            'name': 'page/store'
        }).then(v => {
             return this.loadCategory(args['id']);
        });
    }
}
