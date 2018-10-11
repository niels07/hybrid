define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function on(type) {
        return function (viewManager, handlerName, descriptor) {
            viewManager.d_addEventHandler(type, handlerName);
        };
    }
    exports.on = on;
});
//# sourceMappingURL=on.js.map