var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "lib/html", "./storeSelection", "core/view", "lib/di", "lib/html"], function (require, exports, html_1, storeSelection_1, view_1, di_1, html_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductView = /** @class */ (function (_super) {
        __extends(ProductView, _super);
        function ProductView(viewManager, storeSelection, magnifier, carousel) {
            var _this = _super.call(this, 'page/store/product') || this;
            _this.viewManager = viewManager;
            _this.storeSelection = storeSelection;
            _this.magnifier = magnifier;
            _this.carousel = carousel;
            _this.loadProductsView = function (productsView) {
                productsView.load({
                    onLoad: function () { return _this.storeSelection.setState(2); },
                    args: { categoryId: _this.product['categoryId'] },
                    handleEvents: false
                });
            };
            _this.renderMagnifier = function () {
                var img = _this.carousel.getCurrentImage();
                _this.magnifier.apply(img, 150);
            };
            _this.handleProductImages = function () {
                var el = document.getElementById('product-image-gallery');
                if (el) {
                    _this.carousel.start(el);
                    var img = _this.carousel.getCurrentImage();
                    img.onload = function () {
                        _this.magnifier.apply(img, 150);
                    };
                }
                else {
                    var img = document.querySelector('#product-image img');
                    if (img) {
                        img.onload = function () {
                            _this.magnifier.apply(img, 25, 50);
                        };
                    }
                }
            };
            _this.loadPage = function () {
                _this.product = _this.getData('product');
                _this.pushState({ 'productId': _this.product['id'] });
                _this.storeSelection.setActive(false);
                var openBtn = document.getElementById('store-selection-open');
                if (openBtn) {
                    openBtn.style.display = 'block';
                }
                _this.checkProductsView();
                _this.handleProductImages();
            };
            _this.carouselNext = function (args) {
                _this.carousel.next();
                _this.renderMagnifier();
            };
            _this.carouselPrev = function (args) {
                _this.carousel.prev();
                _this.renderMagnifier();
            };
            _this.showSelection = function (args) {
                _this.storeSelection.setActive();
                var openBtn = document.getElementById('store-selection-open');
                if (openBtn) {
                    openBtn.style.display = 'none';
                }
                _this.storeSelection.update('#store-products');
            };
            return _this;
        }
        ProductView.prototype.checkProductsView = function () {
            var _this = this;
            var productsView = this.viewManager.getView('page/store/products');
            if (productsView.isActive()) {
                return;
            }
            this.viewManager.getView('page/store/categories').load({
                onLoad: function (args) { _this.loadProductsView(productsView); },
                args: {},
                handleEvents: false
            });
        };
        __decorate([
            view_1.onLoad()
        ], ProductView.prototype, "loadPage", void 0);
        __decorate([
            view_1.callback()
        ], ProductView.prototype, "carouselNext", void 0);
        __decorate([
            view_1.callback()
        ], ProductView.prototype, "carouselPrev", void 0);
        __decorate([
            view_1.callback()
        ], ProductView.prototype, "showSelection", void 0);
        ProductView = __decorate([
            __param(0, di_1.inject(view_1.ViewManager)),
            __param(1, di_1.inject(storeSelection_1.StoreSelection)),
            __param(2, di_1.inject(html_2.Magnifier)),
            __param(3, di_1.inject(html_1.Carousel))
        ], ProductView);
        return ProductView;
    }(view_1.BaseView));
    exports.ProductView = ProductView;
});
//# sourceMappingURL=productView.js.map