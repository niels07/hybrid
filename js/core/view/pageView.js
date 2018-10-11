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
define(["require", "exports", "./baseView"], function (require, exports, baseView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PageView = /** @class */ (function (_super) {
        __extends(PageView, _super);
        function PageView(name) {
            return _super.call(this, name) || this;
        }
        PageView.prototype.load = function (args) {
            var _this = this;
            var onLoad = function (response) {
                if (args.args) {
                    _this.pushState(args.args);
                }
                if (args.onLoad) {
                    args.onLoad(response);
                }
                if (!('data' in response)) {
                    return;
                }
                var data = response['data'];
                var title = data['title'];
                if (title) {
                    document.title = title;
                }
            };
            this.__loadViewArgs = {
                onLoad: onLoad,
                args: args.args,
                handleEvents: args.handleEvents
            };
            _super.prototype.load.call(this, this.__loadViewArgs);
        };
        return PageView;
    }(baseView_1.BaseView));
    exports.PageView = PageView;
});
//# sourceMappingURL=pageView.js.map