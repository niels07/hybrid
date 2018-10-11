define(["require", "exports", "core/app"], function (require, exports, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Admin = /** @class */ (function () {
        function Admin() {
        }
        Admin.prototype.load = function () {
            var app = new app_1.App('/js/app/admin/config.json');
            app.dispatch();
        };
        return Admin;
    }());
    exports.Admin = Admin;
});
//# sourceMappingURL=main.js.map