define(["require", "exports", "core/app"], function (require, exports, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = /** @class */ (function () {
        function Page() {
        }
        Page.prototype.load = function () {
            var app = new app_1.App('/js/app/page/config.json');
            app.dispatch();
        };
        return Page;
    }());
    exports.Page = Page;
});
//# sourceMappingURL=main.js.map