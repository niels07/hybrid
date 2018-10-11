define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServiceFactory = /** @class */ (function () {
        function ServiceFactory(type) {
            this.type = type;
            this.instance = null;
            this.params = {};
            this.type = type;
        }
        ServiceFactory.prototype.getCtorName = function (type) {
            return type.toString().match(/function (\w*)/)[1];
        };
        ServiceFactory.prototype.addParam = function (name, param) {
            this.params[name] = param;
        };
        ServiceFactory.prototype.getInstance = function (type, args) {
            var service = this.__container.getService(type);
            if (!service) {
                var name = this.getCtorName(type);
                throw new Error("requested service '" + name + "' not found");
            }
            var instance = this.__container.resolveService(service, args);
            if (!instance) {
                var name = this.getCtorName(type);
                throw new Error("requested service '" + name + "' not found");
            }
            if (!(instance instanceof this.type)) {
                throw new TypeError('factory does not provide the requested service type');
            }
            return instance;
        };
        ServiceFactory.prototype.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var type;
            if (args.length > 0 && typeof args[0] === 'function' && this.__container.getService(args[0])) {
                type = args[0];
                args.shift();
            }
            else {
                type = this.type;
            }
            return this.getInstance(type, args);
        };
        return ServiceFactory;
    }());
    exports.ServiceFactory = ServiceFactory;
});
//# sourceMappingURL=serviceFactory.js.map