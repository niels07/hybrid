define(["require", "exports", "./serviceProvider"], function (require, exports, serviceProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Decorator = /** @class */ (function () {
        function Decorator() {
        }
        Decorator.inject = function (target, funcName, service, idx) {
            Decorator.getProvider().inject(target, funcName, service, idx);
        };
        Decorator.registerSingleton = function (service) {
            Decorator.getProvider().register(service).singleton();
        };
        Decorator.registerService = function (service) {
            Decorator.getProvider().register(service);
        };
        Decorator.getService = function (id) {
            return Decorator.getProvider().getService(id);
        };
        Decorator.getProvider = function () {
            if (!Decorator.serviceProvider) {
                Decorator.serviceProvider = new serviceProvider_1.ServiceProvider();
            }
            return Decorator.serviceProvider;
        };
        return Decorator;
    }());
    exports.Decorator = Decorator;
});
//# sourceMappingURL=decorator.js.map