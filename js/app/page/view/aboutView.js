var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "core/view"], function (require, exports, view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AboutView = /** @class */ (function (_super) {
        __extends(AboutView, _super);
        function AboutView() {
            return _super.call(this, 'page/about') || this;
        }
        return AboutView;
    }(view_1.PageView));
    exports.AboutView = AboutView;
});
//# sourceMappingURL=aboutView.js.map