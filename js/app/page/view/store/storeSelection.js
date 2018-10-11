var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "core/view", "core/config", "lib/di"], function (require, exports, view_1, config_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StoreSelection = /** @class */ (function () {
        function StoreSelection(viewManager, config) {
            var _this = this;
            this.viewManager = viewManager;
            this.config = config;
            this.getDiv = function () {
                return document.getElementById('store-selection-wrapper');
            };
            this.getSlider = function () {
                return document.getElementById('store-selection-slider');
            };
            this.getHeightMobile = function (el) {
                var items = el.getElementsByClassName('item');
                var nItems = items.length;
                var rowHeight = 130;
                var height = nItems == 0 ? rowHeight : nItems * rowHeight;
                var back = el.getElementsByClassName('back');
                if (back.length > 0) {
                    height += back[0].offsetHeight;
                }
                return height;
            };
            this.getHeightRegular = function (el) {
                var items = el.getElementsByClassName('item');
                var nItems = items.length;
                var slider = _this.getSlider();
                var rowHeight = 325;
                var rowMaxItems = 4;
                var height = nItems == 0
                    ? rowHeight
                    : (Math.ceil(nItems / rowMaxItems) * rowHeight);
                var back = el.getElementsByClassName('back');
                if (back.length > 0) {
                    height += back[0].offsetHeight;
                }
                return height;
            };
            this.getHeight = function (el) {
                var mt = _this.config.get('mobileThreshold');
                return mt && screen.width < mt
                    ? _this.getHeightMobile(el)
                    : _this.getHeightRegular(el);
            };
            this.updateHeight = function (el) {
                var height = _this.getHeight(el) + 50;
                _this.getDiv().style.height = height + 'px';
            };
            this.update = function (id) {
                var el = document.querySelector(id);
                _this.updateHeight(el);
            };
            this.loadView = function (viewName, args) {
                _this.setActive();
                _this.viewManager.getView('page/store/' + viewName).load({
                    onLoad: function () {
                        _this.update("[data-view=\"page/store/" + viewName + "\"]");
                    },
                    args: args,
                    handleEvents: true
                });
            };
            this.setActive = function (active) {
                if (active === void 0) { active = true; }
                if (active) {
                    _this.getDiv().classList.add('active');
                }
                else {
                    _this.getDiv().classList.remove('active');
                    _this.getDiv().style.height = '';
                }
            };
            this.setState = function (state) {
                _this.getSlider().className = 'state' + state;
            };
        }
        StoreSelection = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(view_1.ViewManager)),
            __param(1, di_1.inject(config_1.ConfigCollection))
        ], StoreSelection);
        return StoreSelection;
    }());
    exports.StoreSelection = StoreSelection;
});
//# sourceMappingURL=storeSelection.js.map