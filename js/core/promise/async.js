define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function async(fn) {
        setTimeout(fn, 5);
    }
    exports.async = async;
});
//# sourceMappingURL=async.js.map