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
define(["require", "exports", "./store/storeSelection", "lib/di", "core/view"], function (require, exports, storeSelection_1, di_1, view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StoreView = /** @class */ (function (_super) {
        __extends(StoreView, _super);
        function StoreView(storeSelection) {
            var _this = _super.call(this, 'page/store') || this;
            _this.storeSelection = storeSelection;
            _this.loadPage = function () {
                _this.storeSelection.setActive(false);
            };
            _this.loadCategories = function (args) {
                _this.storeSelection.loadView('categories', args);
            };
            return _this;
        }
        __decorate([
            view_1.onLoad()
        ], StoreView.prototype, "loadPage", void 0);
        __decorate([
            view_1.callback()
        ], StoreView.prototype, "loadCategories", void 0);
        StoreView = __decorate([
            __param(0, di_1.inject(storeSelection_1.StoreSelection))
        ], StoreView);
        return StoreView;
    }(view_1.PageView));
    exports.StoreView = StoreView;
});
//# sourceMappingURL=storeView.js.map