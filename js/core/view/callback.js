define(["require", "exports", "./decorator"], function (require, exports, decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function callback() {
        return function (view, handlerName, descriptor) {
            decorator_1.Decorator.callback(view, handlerName);
        };
    }
    exports.callback = callback;
});
//# sourceMappingURL=callback.js.map