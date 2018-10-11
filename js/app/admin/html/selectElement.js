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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./baseElement", "lib/di"], function (require, exports, baseElement_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SelectElement = /** @class */ (function (_super) {
        __extends(SelectElement, _super);
        function SelectElement(selector) {
            var _this = _super.call(this) || this;
            _this.addOption = function (type, id, text) {
                var opt = document.createElement('option');
                opt.value = id;
                opt.id = type + "-" + id;
                opt.text = text;
                _this.htmlElement.add(opt);
                return opt;
            };
            _this.setOnChange = function (onChange) {
                _this.htmlElement.onchange = onChange;
            };
            _this.getValue = function () {
                return _this.htmlElement.value;
            };
            _this.clear = function () {
                _this.htmlElement.innerHTML = '';
            };
            _this.htmlElement = document.querySelector(selector);
            return _this;
        }
        SelectElement = __decorate([
            di_1.service()
        ], SelectElement);
        return SelectElement;
    }(baseElement_1.BaseElement));
    exports.SelectElement = SelectElement;
});
//# sourceMappingURL=selectElement.js.map