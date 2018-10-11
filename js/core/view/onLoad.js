define(["require", "exports", "./decorator"], function (require, exports, decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function onLoad() {
        return function (view, handlerName, descriptor) {
            decorator_1.Decorator.onLoad(view, handlerName);
        };
    }
    exports.onLoad = onLoad;
});
//# sourceMappingURL=onLoad.js.map