import { EventArgs } from 'core/event';
import { Carousel } from 'lib/html';
import { StoreSelection } from './storeSelection';
import { ViewManager, BaseView, onLoad, callback } from 'core/view';
import { inject } from 'lib/di';
import { Magnifier } from 'lib/html';

export class ProductView extends BaseView {

    private product: { [key: string]: any };

    public constructor(
        @inject(ViewManager) private viewManager: ViewManager,
        @inject(StoreSelection) private storeSelection: StoreSelection,
        @inject(Magnifier) private magnifier: Magnifier,
        @inject(Carousel) private carousel: Carousel) {
        super('page/store/product');
    }

    private loadProductsView = (productsView: BaseView): void => {
        productsView.load({
            onLoad: () => this.storeSelection.setState(2),
            args: { categoryId: this.product['categoryId'] },
            handleEvents: false
        });
    }

    private checkProductsView(): void {
        var productsView = this.viewManager.getView('page/store/products');

        if (productsView.isActive()) {
            return;
        }

        this.viewManager.getView('page/store/categories').load({
            onLoad: (args: EventArgs) => {this.loadProductsView(productsView);},
            args: {},
            handleEvents: false
        });
    }

    private renderMagnifier = (): void => {
        var img = this.carousel.getCurrentImage();
        this.magnifier.apply(img, 150);
    }

    private handleProductImages = (): void => {
        var el = document.getElementById('product-image-gallery');
        if (el) {
            this.carousel.start(el);
            var img = this.carousel.getCurrentImage();
            img.onload = () => {
                this.magnifier.apply(img, 150);
            }
        } else {
            var img = <HTMLImageElement>document.querySelector('#product-image img');
            if (img) {
                img.onload = () => {
                    this.magnifier.apply(img, 25, 50);
                }
            }
        }
    }

    @onLoad()
    protected loadPage = (): void => {
        this.product = this.getData('product');
        this.pushState({'productId': this.product['id']});
        this.storeSelection.setActive(false);
        var openBtn = document.getElementById('store-selection-open')
        if (openBtn) {
            openBtn.style.display = 'block';
        }
        this.checkProductsView();
        this.handleProductImages();
    }

    @callback()
    private carouselNext = (args: EventArgs): void => {
        this.carousel.next();
        this.renderMagnifier();
    }

    @callback()
    private carouselPrev = (args: EventArgs): void => {
        this.carousel.prev();
        this.renderMagnifier();
    }

    @callback()
    private showSelection = (args: EventArgs): void => {
        this.storeSelection.setActive();
        var openBtn = document.getElementById('store-selection-open')
        if (openBtn) {
            openBtn.style.display = 'none';
        }
        this.storeSelection.update('#store-products');
    }
}
