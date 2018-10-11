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
define(["require", "exports", "core/model"], function (require, exports, model_1) {
    "use strict";
    exports.__esModule = true;
    var DayModel = /** @class */ (function (_super) {
        __extends(DayModel, _super);
        function DayModel(data) {
            var _this = _super.call(this, data) || this;
            _this.getName = function () {
                return _this.name;
            };
            _this.getOpen = function () {
                return _this.open;
            };
            _this.getClosed = function () {
                return _this.closed;
            };
            return _this;
        }
        return DayModel;
    }(model_1.DataModel));
    exports.DayModel = DayModel;
});
//# sourceMappingURL=dayModel.js.map