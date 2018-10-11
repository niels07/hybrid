define(["require", "exports", "./decorator"], function (require, exports, decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function service() {
        return function (target) {
            decorator_1.Decorator.registerService(target);
        };
    }
    exports.service = service;
});
//# sourceMappingURL=service.js.map