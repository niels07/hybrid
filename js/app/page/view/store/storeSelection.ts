import { EventArgs } from 'core/event';
import { ViewManager, BaseView, callback } from 'core/view';
import { ConfigCollection } from 'core/config';
import { inject, singleton } from 'lib/di';

@singleton()
export class StoreSelection {

    constructor(
        @inject(ViewManager) private viewManager: ViewManager,
        @inject(ConfigCollection) private config: ConfigCollection) {
    }

    getDiv = (): HTMLElement => {
        return <HTMLElement>document.getElementById('store-selection-wrapper');
    }

    getSlider = (): HTMLElement => {
        return <HTMLElement>document.getElementById('store-selection-slider');
    }

    private getHeightMobile = (el: HTMLDivElement): number => {
        var items = el.getElementsByClassName('item');
        var nItems = items.length;
        const rowHeight = 130;

        var height = nItems == 0 ? rowHeight: nItems * rowHeight;
        var back = el.getElementsByClassName('back');

        if (back.length > 0) {
            height += (<HTMLDivElement>back[0]).offsetHeight;
        }
        return height;
    }

    private getHeightRegular = (el: HTMLDivElement) => {
        var items = el.getElementsByClassName('item');
        var nItems = items.length;
        var slider = this.getSlider();

        const rowHeight = 325;
        const rowMaxItems = 4;

        var height = nItems == 0
            ? rowHeight
            : (Math.ceil(nItems / rowMaxItems) * rowHeight);

        var back = el.getElementsByClassName('back');
        if (back.length > 0) {
            height += (<HTMLDivElement>back[0]).offsetHeight;
        }
        return height;
    }

    private getHeight = (el: HTMLDivElement): number => {
        var mt = this.config.get('mobileThreshold');
        return mt && screen.width < mt
            ? this.getHeightMobile(el)
            : this.getHeightRegular(el);
    }

    updateHeight = (el: HTMLDivElement): void => {
        var height = this.getHeight(el) + 50;
        this.getDiv().style.height = height + 'px';
    }

    update = (id: string): void => {
        var el = document.querySelector(id);
        this.updateHeight(<HTMLDivElement>el);
    }

    loadView = (viewName: string, args: EventArgs): void => {
        this.setActive();
        this.viewManager.getView('page/store/' + viewName).load({
            onLoad: () => {
                this.update(`[data-view="page/store/${viewName}"]`);
            },
            args: args,
            handleEvents: true
        });
    }

    setActive = (active: boolean = true): void => {
        if (active) {
            this.getDiv().classList.add('active');
        } else {
            this.getDiv().classList.remove('active');
            this.getDiv().style.height = '';
        }
    }

    setState = (state: number): void => {
        this.getSlider().className = 'state' + state;
    }
}
