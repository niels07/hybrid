define(["require", "exports", "./serviceData"], function (require, exports, serviceData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Param = /** @class */ (function () {
        function Param(value, container, args) {
            if (args === void 0) { args = []; }
            this.value = value;
            this.container = container;
            this.args = args;
        }
        Param.prototype.getValue = function () {
            return (this.value instanceof serviceData_1.ServiceData)
                ? this.container.resolveService(this.value, this.args)
                : this.value;
        };
        return Param;
    }());
    exports.Param = Param;
});
//# sourceMappingURL=param.js.map