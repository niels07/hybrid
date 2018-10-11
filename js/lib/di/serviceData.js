define(["require", "exports", "./param"], function (require, exports, param_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServiceData = /** @class */ (function () {
        function ServiceData(type, container) {
            var _this = this;
            this.type = type;
            this.container = container;
            this.instance = null;
            this.single = false;
            this.createInstance = function (args) {
                return _this.construct(_this.type, args);
            };
            this.loadParams = function (args) {
                if (!_this.params) {
                    return args;
                }
                var paramNames = _this.getParamNames(_this.type);
                var params = [];
                var j = 0;
                for (var i = 0; i < paramNames.length; i++) {
                    var name = paramNames[i];
                    if (name in _this.params) {
                        var param = _this.params[name];
                        params.push(param.getValue());
                    }
                    else {
                        params.push(args[j++]);
                    }
                }
                for (; j < args.length; j++) {
                    params.push(args[j]);
                }
                return params;
            };
            this.resolve = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var params = _this.loadParams(args);
                if (!_this.single) {
                    return _this.createInstance(params);
                }
                if (!_this.instance) {
                    _this.instance = _this.createInstance(params);
                }
                return _this.instance;
            };
        }
        ServiceData.prototype.getType = function () {
            return this.type;
        };
        ServiceData.prototype.getParamNames = function (f) {
            var fStr = f.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
            var names = fStr.slice(fStr.indexOf('(') + 1, fStr.indexOf(')')).match(/([^\s,]+)/g);
            return !names ? [] : names;
        };
        ServiceData.prototype.construct = function (constructor, args) {
            var f = function f() {
                constructor.apply(this, args);
            };
            f.prototype = constructor.prototype;
            return new f();
        };
        ServiceData.prototype.setSingleInstance = function () {
            this.single = true;
        };
        ServiceData.prototype.addParam = function (name, value, args) {
            if (args === void 0) { args = []; }
            if (!this.params) {
                this.params = {};
            }
            if (value instanceof param_1.Param) {
                this.params[name] = value;
            }
            else {
                this.params[name] = new param_1.Param(value, this.container, args);
            }
        };
        return ServiceData;
    }());
    exports.ServiceData = ServiceData;
});
//# sourceMappingURL=serviceData.js.map