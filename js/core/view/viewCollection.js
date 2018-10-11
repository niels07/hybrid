var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "./viewFactory", "./baseView", "../http", "lib/di"], function (require, exports, viewFactory_1, baseView_1, http_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewCollection = /** @class */ (function () {
        function ViewCollection(viewFactory, requestHandler) {
            var _this = this;
            this.viewFactory = viewFactory;
            this.requestHandler = requestHandler;
            this.get = function (name) {
                if (!_this.contains(name)) {
                    _this.views[name] = _this.viewFactory.create(baseView_1.BaseView, name);
                    _this.views[name]['__requestHandler'] = _this.requestHandler;
                }
                return _this.views[name];
            };
            this.set = function (name, item) {
                if (typeof item === 'function') {
                    _this.views[name] = _this.viewFactory.create(item);
                }
                else {
                    _this.views[name] = item;
                }
                _this.views[name]['__requestHandler'] = _this.requestHandler;
            };
            this.toArray = function () {
                return Object.keys(_this.views).map(function (key) { return _this.views[key]; });
            };
            this.views = {};
        }
        ViewCollection.prototype.contains = function (name) {
            return name in this.views;
        };
        ViewCollection.prototype.each = function (f) {
            for (var i in this.views) {
                f(this.views[i]);
            }
        };
        ViewCollection = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(viewFactory_1.ViewFactory)),
            __param(1, di_1.inject(http_1.XHRequestHandler))
        ], ViewCollection);
        return ViewCollection;
    }());
    exports.ViewCollection = ViewCollection;
});
//# sourceMappingURL=viewCollection.js.map