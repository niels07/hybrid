var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "core/app", "core/http", "core/view", "lib/di", "core/promise"], function (require, exports, app_1, http_1, view_1, di_1, promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdminDispatcher = /** @class */ (function () {
        function AdminDispatcher(requestHandler, viewManager, polyfillLoader, promiseFactory) {
            var _this = this;
            this.requestHandler = requestHandler;
            this.viewManager = viewManager;
            this.polyfillLoader = polyfillLoader;
            this.promiseFactory = promiseFactory;
            this.logoutHandler = function () {
                _this.requestHandler.sendRequest({
                    'route': 'admin',
                    'action': 'logout'
                }).then(function (r) {
                    return _this.viewManager.loadView({ name: 'admin/login' });
                });
            };
            this.invoke = function () {
                _this.polyfillLoader.load('customEvent').then(function (v) {
                    return _this.requestHandler.sendRequest({
                        'route': 'admin',
                        'action': 'verifyLogin',
                    });
                }).then(function (r) {
                    var authorized = r.getData('authorized');
                    var viewName = (authorized === true) ? 'products' : 'login';
                    return _this.viewManager.loadView({ name: 'admin/' + viewName });
                }).then(function (v) {
                    var logoutBtn = document.getElementById('logout-button');
                    if (logoutBtn) {
                        logoutBtn.onclick = _this.logoutHandler;
                    }
                }).except(function (e) {
                    console.log(e);
                });
            };
        }
        AdminDispatcher = __decorate([
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(view_1.ViewManager)),
            __param(2, di_1.inject(app_1.PolyfillLoader)),
            __param(3, di_1.inject(promise_1.PromiseFactory))
        ], AdminDispatcher);
        return AdminDispatcher;
    }());
    exports.AdminDispatcher = AdminDispatcher;
});
//# sourceMappingURL=adminDispatcher.js.map