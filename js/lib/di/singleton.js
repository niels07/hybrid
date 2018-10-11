define(["require", "exports", "./decorator"], function (require, exports, decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function singleton() {
        return function (target) {
            decorator_1.Decorator.registerSingleton(target);
        };
    }
    exports.singleton = singleton;
});
//# sourceMappingURL=singleton.js.map