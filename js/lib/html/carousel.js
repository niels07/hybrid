var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Carousel = /** @class */ (function () {
        function Carousel() {
            var _this = this;
            this.active = false;
            this.start = function (element) {
                _this.index = 0;
                _this.images = element.getElementsByClassName('image');
                for (var i = 1; i < _this.images.length; i++) {
                    var image = _this.images[i];
                    image.style.left = '500px';
                }
                _this.images[0].classList.add('animate');
                _this.element = element;
            };
            this.getCurrentImage = function () {
                var el = _this.images[_this.index];
                return el.firstElementChild;
            };
        }
        ;
        Carousel.prototype.prev = function () {
            var _this = this;
            if (this.active) {
                return;
            }
            this.active = true;
            var curr = this.images[this.index];
            if (--this.index < 0) {
                this.index = this.images.length - 1;
            }
            var prev = this.images[this.index];
            prev.style.left = '-500px';
            prev.offsetHeight;
            curr.classList.add('animate');
            prev.classList.add('animate');
            prev.style.left = '0px';
            curr.style.left = '500px';
            setTimeout(function () {
                curr.classList.remove('animate');
                prev.classList.remove('animate');
                _this.active = false;
            }, 500);
        };
        Carousel.prototype.next = function () {
            var _this = this;
            if (this.active) {
                return;
            }
            this.active = true;
            var curr = this.images[this.index];
            if (++this.index == this.images.length) {
                this.index = 0;
            }
            var next = this.images[this.index];
            next.style.left = '500px';
            next.offsetHeight;
            next.classList.add('animate');
            curr.classList.add('animate');
            next.style.left = '0px';
            curr.style.left = '-500px';
            setTimeout(function () {
                curr.classList.remove('animate');
                next.classList.remove('animate');
                _this.active = false;
            }, 500);
        };
        Carousel = __decorate([
            di_1.service()
        ], Carousel);
        return Carousel;
    }());
    exports.Carousel = Carousel;
});
//# sourceMappingURL=carousel.js.map