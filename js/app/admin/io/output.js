var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Output = /** @class */ (function () {
        function Output() {
        }
        Output.prototype.showMessage = function (message, className) {
            var overlay = document.createElement('div');
            overlay.className = 'overlay';
            var popup = document.createElement('div');
            popup.className = 'popup ' + className;
            var button = document.createElement('button');
            button.onclick = function () {
                popup.parentNode.removeChild(popup);
                overlay.parentNode.removeChild(overlay);
            };
            button.innerHTML = 'OK';
            var text = document.createTextNode(message);
            popup.appendChild(text);
            popup.appendChild(button);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
            window.scrollTo(0, 0);
        };
        Output.prototype.write = function (message) {
            this.showMessage(message, 'info');
        };
        Output.prototype.error = function (message) {
            this.showMessage(message, 'error');
        };
        Output = __decorate([
            di_1.singleton()
        ], Output);
        return Output;
    }());
    exports.Output = Output;
});
//# sourceMappingURL=output.js.map