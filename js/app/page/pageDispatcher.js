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
    var PageDispatcher = /** @class */ (function () {
        function PageDispatcher(viewManager) {
            var _this = this;
            this.viewManager = viewManager;
            this.invoke = function () {
                _this.viewManager.loadView().then(function (v) {
                    return _this.viewManager.loadView({ 'name': 'page/footer' });
                }).except(function (e) {
                    throw new Error(e);
                });
            };
        }
        PageDispatcher = __decorate([
            __param(0, di_1.inject(view_1.ViewManager))
        ], PageDispatcher);
        return PageDispatcher;
    }());
    exports.PageDispatcher = PageDispatcher;
});
//# sourceMappingURL=pageDispatcher.js.map