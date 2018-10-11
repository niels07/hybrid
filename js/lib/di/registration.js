define(["require", "exports", "./param"], function (require, exports, param_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Registration = /** @class */ (function () {
        function Registration(type, container) {
            this.type = type;
            this.container = container;
            this.container.setService(this.type);
        }
        Registration.prototype.getService = function () {
            return this.container.getService(this.type);
        };
        Registration.prototype.singleton = function () {
            var service = this.getService();
            if (service) {
                service.setSingleInstance();
            }
            return this;
        };
        Registration.prototype.resolveParam = function (name, type) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var service = this.getService();
            if (service) {
                var param = this.container.createParam(type, args);
                service.addParam(name, param);
            }
            return this;
        };
        Registration.prototype.valueParam = function (name, value) {
            var param = new param_1.Param(value, this.container);
            var service = this.getService();
            if (service) {
                service.addParam(name, param);
            }
            return this;
        };
        return Registration;
    }());
    exports.Registration = Registration;
});
//# sourceMappingURL=registration.js.map