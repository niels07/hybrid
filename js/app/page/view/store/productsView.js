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
define(["require", "exports", "./storeSelection", "core/view", "core/config", "lib/di"], function (require, exports, storeSelection_1, view_1, config_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductsView = /** @class */ (function (_super) {
        __extends(ProductsView, _super);
        function ProductsView(viewManager, storeSelection, config) {
            var _this = _super.call(this, 'page/store/products') || this;
            _this.viewManager = viewManager;
            _this.storeSelection = storeSelection;
            _this.config = config;
            _this.loadProductSelection = function () {
                _this.storeSelection.setActive();
                _this.storeSelection.setState(2);
                _this.storeSelection.update('#store-products');
                var mt = _this.config.get('mobileThreshold');
                if (mt && screen.width <= mt) {
                    _this.viewManager.hideView('page/store/categories');
                }
            };
            _this.checkCategoriesView = function () {
                var categoriesView = _this.viewManager.getView('page/store/categories');
                if (categoriesView.isActive()) {
                    _this.loadProductSelection();
                    return;
                }
                categoriesView.load({
                    onLoad: _this.loadProductSelection,
                    args: {},
                    handleEvents: false
                });
            };
            _this.loadView = function () {
                //this.storeSelection.setActive();
                //this.storeSelection.setState(2);
                //this.storeSelection.update('#store-products');
                _this.checkCategoriesView();
            };
            _this.loadProduct = function (args) {
                _this.storeSelection.setActive(false);
                _this.viewManager.loadView({ name: 'page/store/product', args: args });
            };
            _this.loadCategories = function (args) {
                _this.storeSelection.loadView('categories', args);
            };
            return _this;
        }
        __decorate([
            view_1.onLoad()
        ], ProductsView.prototype, "loadView", void 0);
        __decorate([
            view_1.callback()
        ], ProductsView.prototype, "loadProduct", void 0);
        __decorate([
            view_1.callback()
        ], ProductsView.prototype, "loadCategories", void 0);
        ProductsView = __decorate([
            __param(0, di_1.inject(view_1.ViewManager)),
            __param(1, di_1.inject(storeSelection_1.StoreSelection)),
            __param(2, di_1.inject(config_1.ConfigCollection))
        ], ProductsView);
        return ProductsView;
    }(view_1.BaseView));
    exports.ProductsView = ProductsView;
});
//# sourceMappingURL=productsView.js.map