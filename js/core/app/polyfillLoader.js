var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "lib/di", "core/promise"], function (require, exports, di_1, promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PolyfillLoader = /** @class */ (function () {
        function PolyfillLoader(promiseFactory) {
            var _this = this;
            this.promiseFactory = promiseFactory;
            this.load = function (name) {
                var promise = _this.promiseFactory.create(function (resolve, reject) {
                    require(['lib/polyfills/' + name], function (result) {
                        resolve(result);
                    });
                });
                return promise;
            };
        }
        PolyfillLoader = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(promise_1.PromiseFactory))
        ], PolyfillLoader);
        return PolyfillLoader;
    }());
    exports.PolyfillLoader = PolyfillLoader;
});
//# sourceMappingURL=polyfillLoader.js.map