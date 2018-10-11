var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./xhResponseStatus", "lib/di"], function (require, exports, xhResponseStatus_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XHResponse = /** @class */ (function () {
        function XHResponse(data, status, error) {
            if (data === void 0) { data = {}; }
            if (status === void 0) { status = xhResponseStatus_1.XHResponseStatus.Success; }
            var _this = this;
            this.data = data;
            this.status = status;
            this.error = error;
            this.getData = function (name) {
                if (!name) {
                    return _this.data;
                }
                else if (name in _this.data) {
                    return _this.data[name];
                }
                else {
                    return undefined;
                }
            };
            this.getStatus = function () {
                return _this.status;
            };
            this.getError = function () {
                return _this.error;
            };
        }
        XHResponse = __decorate([
            di_1.service()
        ], XHResponse);
        return XHResponse;
    }());
    exports.XHResponse = XHResponse;
});
//# sourceMappingURL=xhResponse.js.map