var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigCollection = /** @class */ (function () {
        function ConfigCollection(data) {
            if (data === void 0) { data = {}; }
            var _this = this;
            this.contains = function (name) {
                return name in _this.items;
            };
            this.get = function (name) {
                return _this.contains(name) ? _this.items[name] : null;
            };
            this.set = function (name, value) {
                _this.items[name] = value;
            };
            this.setData = function (data) {
                _this.items = data;
            };
            this.items = data;
        }
        ConfigCollection.prototype.each = function (f) {
            for (var i in this.items) {
                f(this.items[i]);
            }
        };
        ConfigCollection.prototype.forEach = function (handler) {
            throw new Error("Method not implemented.");
        };
        ConfigCollection = __decorate([
            di_1.singleton()
        ], ConfigCollection);
        return ConfigCollection;
    }());
    exports.ConfigCollection = ConfigCollection;
});
//# sourceMappingURL=configCollection.js.map