var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XHRequest = /** @class */ (function () {
        function XHRequest(target, method, async) {
            if (method === void 0) { method = 'POST'; }
            if (async === void 0) { async = true; }
            var _this = this;
            this.target = target;
            this.async = true;
            this.isOpen = false;
            this.handleStatus = function () {
                if (_this.xhr.status === 200) {
                    _this.response = _this.xhr.responseText;
                    if (_this.onLoad) {
                        _this.onLoad(_this);
                    }
                }
                else {
                    _this.response = _this.xhr.statusText;
                    if (_this.onError) {
                        _this.onError(_this);
                    }
                }
            };
            this.handleState = function () {
                switch (_this.xhr.readyState) {
                    case XMLHttpRequest.HEADERS_RECEIVED:
                        break;
                    case XMLHttpRequest.LOADING:
                        if (_this.onProgress) {
                            _this.onProgress(_this);
                        }
                        break;
                    case XMLHttpRequest.DONE:
                        _this.handleStatus();
                        break;
                }
            };
            this.send = function (data, onLoad, onError) {
                if (onLoad) {
                    _this.onLoad = onLoad;
                }
                if (onError) {
                    _this.onError = onError;
                }
                _this.open();
                _this.xhr.send(data);
            };
            this.xhr = 'XMLHttpRequest' in window
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            this.method = method;
            this.async = async;
            this.xhr.onreadystatechange = this.handleState;
        }
        XHRequest.prototype.setOnProgress = function (handle) {
            this.onProgress = handle;
        };
        XHRequest.prototype.setOnLoad = function (handle) {
            this.onLoad = handle;
        };
        XHRequest.prototype.setOnError = function (handle) {
            this.onError = handle;
        };
        XHRequest.prototype.open = function () {
            if (this.isOpen) {
                return;
            }
            this.xhr.open(this.method, this.target, this.async);
            this.isOpen = true;
        };
        XHRequest.prototype.getResponse = function () {
            return this.response;
        };
        XHRequest = __decorate([
            di_1.service()
        ], XHRequest);
        return XHRequest;
    }());
    exports.XHRequest = XHRequest;
});
//# sourceMappingURL=xhRequest.js.map