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
define(["require", "exports", "core/view", "core/view", "core/http", "lib/di"], function (require, exports, view_1, view_2, http_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginView = /** @class */ (function (_super) {
        __extends(LoginView, _super);
        function LoginView(requestHandler, viewManager) {
            var _this = _super.call(this, 'admin/login') || this;
            _this.requestHandler = requestHandler;
            _this.viewManager = viewManager;
            _this.login = function () {
                var form = document.getElementById('login-form');
                _this.requestHandler.sendRequest({
                    'data': form,
                    'action': 'login',
                    'route': 'admin'
                }).then(function (r) {
                    if (r['data']['authorized'] == true) {
                        _this.viewManager.loadView({ 'name': 'admin/products' });
                    }
                });
            };
            return _this;
        }
        __decorate([
            view_2.callback()
        ], LoginView.prototype, "login", void 0);
        LoginView = __decorate([
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(view_1.ViewManager))
        ], LoginView);
        return LoginView;
    }(view_1.PageView));
    exports.LoginView = LoginView;
});
//# sourceMappingURL=loginView.js.map