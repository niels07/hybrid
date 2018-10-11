define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GenericCollectionBase = /** @class */ (function () {
        function GenericCollectionBase() {
            var _this = this;
            this.contains = function (name) {
                return name in _this.items;
            };
            this.get = function (name) {
                return _this.contains(name) ? _this.items[name] : undefined;
            };
            this.delete = function (id) {
                delete _this.items[id];
            };
            this.items = {};
        }
        GenericCollectionBase.prototype.set = function (name, item) {
            this.items[name] = item;
        };
        GenericCollectionBase.prototype.forEach = function (handler) {
            for (var key in this.items) {
                var next;
                switch (handler.length) {
                    case 0:
                        next = handler();
                        break;
                    case 1:
                        next = handler(this.items[key]);
                        break;
                    default:
                        next = handler(key, this.items[key]);
                        break;
                }
                if (next === false) {
                    break;
                }
            }
        };
        return GenericCollectionBase;
    }());
    exports.GenericCollectionBase = GenericCollectionBase;
});
//# sourceMappingURL=genericCollectionBase.js.map