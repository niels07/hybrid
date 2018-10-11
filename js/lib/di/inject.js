define(["require", "exports", "./decorator"], function (require, exports, decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function inject(serviceName) {
        return function (target, funcName, argIndex) {
            decorator_1.Decorator.inject(target, funcName, serviceName, argIndex);
        };
    }
    exports.inject = inject;
});
//# sourceMappingURL=inject.js.map