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
define(["require", "exports", "core/view", "./storeSelection", "lib/di"], function (require, exports, view_1, storeSelection_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CategoriesView = /** @class */ (function (_super) {
        __extends(CategoriesView, _super);
        function CategoriesView(storeSelection) {
            var _this = _super.call(this, 'page/store/categories') || this;
            _this.storeSelection = storeSelection;
            _this.loadView = function () {
                _this.storeSelection.setActive();
                _this.storeSelection.setState(1);
                _this.storeSelection.update('#store-categories');
            };
            _this.loadProducts = function (args) {
                _this.storeSelection.loadView('products', args);
            };
            return _this;
        }
        __decorate([
            view_1.onLoad()
        ], CategoriesView.prototype, "loadView", void 0);
        __decorate([
            view_1.callback()
        ], CategoriesView.prototype, "loadProducts", void 0);
        CategoriesView = __decorate([
            __param(0, di_1.inject(storeSelection_1.StoreSelection))
        ], CategoriesView);
        return CategoriesView;
    }(view_1.BaseView));
    exports.CategoriesView = CategoriesView;
});
//# sourceMappingURL=categoriesView.js.map