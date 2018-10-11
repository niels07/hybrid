var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Magnifier = /** @class */ (function () {
        function Magnifier(zoom) {
            if (zoom === void 0) { zoom = 2; }
            var _this = this;
            this.zoom = 2;
            this.removeMagnifier = function () {
                if (!_this.element) {
                    return;
                }
                var parentElement = _this.element.parentElement;
                if (parentElement) {
                    parentElement.removeChild(_this.element);
                }
            };
            this.createMagnifier = function () {
                if (!_this.image || !_this.image.parentElement) {
                    return;
                }
                _this.removeMagnifier();
                _this.element = document.createElement('div');
                _this.element.setAttribute('class', 'magnifier');
                _this.image.parentElement.insertBefore(_this.element, _this.image);
                _this.element.style.backgroundImage = "url('" + _this.image.src + "')";
                _this.element.style.backgroundRepeat = 'no-repeat';
                var bgWidth = _this.image.clientWidth * _this.zoom;
                var bgHeight = _this.image.clientHeight * _this.zoom;
                _this.element.style.backgroundSize = bgWidth + "px " + bgHeight + "px";
            };
            this.getCursorPos = function (e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                a = _this.image.getBoundingClientRect();
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return { x: x, y: y };
            };
            this.apply = function (img, offsetLeft, offsetTop) {
                if (offsetLeft === void 0) { offsetLeft = 0; }
                if (offsetTop === void 0) { offsetTop = 0; }
                var w;
                var h;
                _this.image = img;
                var zoom = _this.zoom;
                _this.createMagnifier();
                var borderWidth = 3;
                w = _this.element.offsetWidth / 2;
                h = _this.element.offsetHeight / 2;
                _this.element.addEventListener("mousemove", moveMagnifier);
                img.addEventListener("mousemove", moveMagnifier);
                _this.element.addEventListener("touchmove", moveMagnifier);
                img.addEventListener("touchmove", moveMagnifier);
                var magnifier = _this.element;
                function moveMagnifier(e) {
                    var pos, x, y;
                    e.preventDefault();
                    pos = getCursorPos(e);
                    x = pos.x;
                    y = pos.y;
                    var bgX = -(x * zoom - w + borderWidth - offsetLeft);
                    var bgY = -(y * zoom - h + borderWidth - offsetTop);
                    magnifier.style.left = (x - w) + "px";
                    magnifier.style.top = (y - h) + "px";
                    magnifier.style.backgroundPosition = bgX + "px " + bgY + "px";
                }
                function getCursorPos(e) {
                    var a, x = 0, y = 0;
                    e = e || window.event;
                    a = img.getBoundingClientRect();
                    x = e.pageX - a.left;
                    y = e.pageY - a.top;
                    x = x - window.pageXOffset;
                    y = y - window.pageYOffset;
                    return { x: x, y: y };
                }
            };
            this.zoom = zoom;
        }
        Magnifier = __decorate([
            di_1.service()
        ], Magnifier);
        return Magnifier;
    }());
    exports.Magnifier = Magnifier;
});
//# sourceMappingURL=magnifier.js.map