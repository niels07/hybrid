define(["require", "exports", "./serviceData", "./param"], function (require, exports, serviceData_1, param_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServiceContainer = /** @class */ (function () {
        function ServiceContainer(injections, services, serviceProvider) {
            var _this = this;
            this.injections = injections;
            this.services = services;
            this.serviceProvider = serviceProvider;
            this.getService = function (type) {
                return _this.serviceProvider.getService(type);
            };
            this.setService = function (type) {
                var name = _this.getTypeName(type);
                _this.services[name] = new serviceData_1.ServiceData(type, _this);
            };
            this.clearService = function (id) {
                delete _this.services[id];
            };
            this.createParam = function (type, args) {
                if (args === void 0) { args = []; }
                var name = _this.getTypeName(type);
                var service = _this.services[name];
                if (service instanceof serviceData_1.ServiceData) {
                    if (!args) {
                        args = [];
                    }
                    if (args.length == 0) {
                        _this.applyInjections(service, args);
                    }
                }
                return new param_1.Param(service, _this, args);
            };
            this.addInjectArgs = function (args, params) {
                for (var i = 0; i < params.length; i++) {
                    if (params[i] != null && (args.length <= i || !args[i])) {
                        var param = params[i];
                        if (args.length <= i) {
                            args.push(_this.serviceProvider.resolveParam(param));
                        }
                        else {
                            args[i] = _this.serviceProvider.resolveParam(param);
                        }
                    }
                }
            };
            this.applyInjections = function (service, args) {
                var name = service.getType().toString().match(/function (\w*)/)[1];
                if (!(name in _this.injections)) {
                    return;
                }
                var params = _this.injections[name];
                _this.addInjectArgs(args, params);
            };
            this.resolveService = function (s, args) {
                var service = s instanceof serviceData_1.ServiceData ? s : _this.getService(s);
                if (!service) {
                    return null;
                }
                if (!(service instanceof serviceData_1.ServiceData)) {
                    return service;
                }
                if (!args) {
                    args = [];
                }
                _this.applyInjections(service, args);
                return (!args || args.length == 0)
                    ? service.resolve.apply(null)
                    : service.resolve.apply(null, args);
            };
        }
        ServiceContainer.prototype.getTypeName = function (type) {
            return type.toString().match(/function (\w*)/)[1];
        };
        return ServiceContainer;
    }());
    exports.ServiceContainer = ServiceContainer;
});
//# sourceMappingURL=serviceContainer.js.map