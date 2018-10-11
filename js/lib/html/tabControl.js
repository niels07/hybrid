var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabControl = /** @class */ (function () {
        function TabControl() {
            var _this = this;
            this.setTabActive = function (name) {
                for (var tabName in _this.tabs) {
                    var tab = _this.tabs[tabName];
                    tab['tab'].classList.remove('active');
                    tab['btn'].classList.remove('active');
                }
                var tab = _this.tabs[name];
                tab['tab'].classList.add('active');
                tab['btn'].classList.add('active');
            };
            this.loadTabElements = function (elements) {
                for (var i = 0; i < elements.length; i++) {
                    var el = elements[i];
                    var name = el.dataset['tabName'];
                    if (!name) {
                        continue;
                    }
                    _this.tabs[name] = {
                        'tab': el,
                        'btn': null
                    };
                }
            };
            this.loadTabButtons = function (buttons) {
                for (var i = 0; i < buttons.length; i++) {
                    var btn = buttons[i];
                    var target = btn.dataset['tabTarget'];
                    if (!target || !(target in _this.tabs)) {
                        continue;
                    }
                    _this.tabs[target]['btn'] = btn;
                    (function (t) {
                        btn.onclick = function (e) {
                            e.preventDefault();
                            _this.setTabActive(t);
                        };
                    })(target);
                }
            };
            this.init = function (el) {
                var buttons = el.querySelectorAll('.tab-button');
                var tabElements = el.querySelectorAll('.tab');
                _this.tabs = {};
                _this.loadTabElements(tabElements);
                _this.loadTabButtons(buttons);
            };
        }
        TabControl = __decorate([
            di_1.service()
        ], TabControl);
        return TabControl;
    }());
    exports.TabControl = TabControl;
});
//# sourceMappingURL=tabControl.js.map