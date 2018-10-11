var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLHelper = /** @class */ (function () {
        function HTMLHelper() {
        }
        HTMLHelper.prototype.createSelectOption = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var opt = document.createElement('option');
            if (args.length == 2) {
                opt.value = args[0].toString();
                opt.text = args[1];
            }
            else {
                var type = args[0];
                var id = args[1].toString();
                opt.value = id;
                opt.text = args[2];
                opt.id = type + "-" + id;
            }
            return opt;
        };
        HTMLHelper.prototype.getSelectOption = function (arg) {
            var el = typeof (arg) === 'string'
                ? document.getElementById(arg)
                : arg;
            var index = el.selectedIndex;
            if (index == -1) {
                return null;
            }
            return el.options[index];
        };
        HTMLHelper.prototype.getSelectText = function (arg) {
            var opt = this.getSelectOption(arg);
            return opt ? opt.text : null;
        };
        HTMLHelper.prototype.deleteSelectOption = function (arg) {
            var el = typeof (arg) === 'string'
                ? document.getElementById(arg)
                : arg;
            var opt = this.getSelectOption(arg);
            if (opt) {
                el.removeChild(opt);
            }
        };
        HTMLHelper = __decorate([
            di_1.singleton()
        ], HTMLHelper);
        return HTMLHelper;
    }());
    exports.HTMLHelper = HTMLHelper;
});
//# sourceMappingURL=htmlHelper.js.map