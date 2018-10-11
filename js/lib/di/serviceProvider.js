define(["require", "exports", "./serviceData", "./registration", "./decorator", "./serviceContainer", "./serviceFactory"], function (require, exports, serviceData_1, registration_1, decorator_1, serviceContainer_1, serviceFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServiceProvider = /** @class */ (function () {
        function ServiceProvider() {
            var _this = this;
            this.injections = {};
            this.services = {};
            this.getService = function (id) {
                var key;
                if (typeof id === 'string') {
                    key = id;
                }
                else if (id) {
                    key = id.toString().match(/function (\w*)/)[1];
                }
                else {
                    return undefined;
                }
                return key in _this.services ? _this.services[key] : undefined;
            };
            this.getInstance = function (service, args) {
                var instance = (!args || args.length == 0)
                    ? service.resolve.apply(null)
                    : service.resolve.apply(null, args);
                if (instance instanceof serviceFactory_1.ServiceFactory) {
                    instance['__container'] = _this.container;
                }
                return instance;
            };
            this.createRegistration = function (type) {
                return new registration_1.Registration(type, _this.container);
            };
            this.getInjectArgs = function (params) {
                var args = [];
                for (var i = 0; i < params.length; i++) {
                    if (params[i]) {
                        var item = _this.resolveParam(params[i]);
                        args.push(item);
                    }
                }
                return args;
            };
            this.getInjections = function (service) {
                var name = service.getType().toString().match(/function (\w*)/)[1];
                if (!(name in _this.injections)) {
                    return [];
                }
                var params = _this.injections[name];
                return _this.getInjectArgs(params);
            };
            this.container = new serviceContainer_1.ServiceContainer(this.injections, this.services, this);
        }
        ServiceProvider.getDecoratorProvider = function () {
            return decorator_1.Decorator.getProvider();
        };
        ServiceProvider.prototype.resolveParam = function (id) {
            var service = this.getService(id);
            if (!(service instanceof serviceData_1.ServiceData)) {
                return service;
            }
            var args = this.getInjections(service);
            return this.getInstance(service, args);
        };
        ServiceProvider.prototype.inject = function (target, funcName, service, idx) {
            var name = target.toString().match(/^function\s*([^\s(]+)/)[1];
            if (!(name in this.injections)) {
                this.injections[name] = [];
            }
            var injects = this.injections[name];
            while (injects.length <= idx) {
                injects.push(null);
            }
            injects[idx] = service;
        };
        ServiceProvider.prototype.register = function (type) {
            return this.createRegistration(type);
        };
        ServiceProvider.prototype.resolve = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var id = type.toString().match(/function (\w*)/)[1];
            var service = this.getService(id);
            if (!(service instanceof serviceData_1.ServiceData)) {
                return service;
            }
            if (!args || args.length == 0) {
                args = this.getInjections(service);
            }
            return this.getInstance(service, args);
        };
        return ServiceProvider;
    }());
    exports.ServiceProvider = ServiceProvider;
});
//# sourceMappingURL=serviceProvider.js.map