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
define(["require", "exports", "core/view", "lib/di"], function (require, exports, view_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FooterView = /** @class */ (function (_super) {
        __extends(FooterView, _super);
        function FooterView(viewManager) {
            var _this = _super.call(this, 'page/footer') || this;
            _this.viewManager = viewManager;
            _this.loadCategory = function (id) {
                return _this.viewManager.loadView({
                    name: 'page/store/products',
                    args: { 'categoryId': id }
                }).then(function (v) {
                    var opener = document.getElementById('store-selection-open');
                    if (opener) {
                        opener.style.visibility = 'hidden';
                    }
                    window.scrollTo(0, 0);
                });
            };
            _this.showStore = function (args) {
                _this.viewManager.loadView({ 'name': 'page/stores' });
            };
            _this.showCategory = function (args) {
                _this.viewManager.loadView({
                    'name': 'page/store'
                }).then(function (v) {
                    return _this.loadCategory(args['id']);
                });
            };
            return _this;
        }
        __decorate([
            view_1.callback()
        ], FooterView.prototype, "showStore", void 0);
        __decorate([
            view_1.callback()
        ], FooterView.prototype, "showCategory", void 0);
        FooterView = __decorate([
            __param(0, di_1.inject(view_1.ViewManager))
        ], FooterView);
        return FooterView;
    }(view_1.BaseView));
    exports.FooterView = FooterView;
});
//# sourceMappingURL=footerView.js.map