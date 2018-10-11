var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "./viewCollection", "lib/di"], function (require, exports, viewCollection_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewLoader = /** @class */ (function () {
        function ViewLoader(viewCollection) {
            var _this = this;
            this.viewCollection = viewCollection;
            this.setDefaultView = function (viewName) {
                _this.defaultView = _this.viewCollection.get(viewName);
            };
            this.loadDefault = function () {
                if (_this.defaultView) {
                    _this.defaultView.load({
                        onLoad: _this.onLoad,
                        args: _this.viewArgs,
                        handleEvents: true
                    });
                }
            };
            this.loadChildView = function (name, onLoad) {
                if (!name) {
                    return;
                }
                _this.index = 1;
                _this.views = name.split('/');
                if (_this.views.length < 2) {
                    return;
                }
                _this.viewName = _this.views[0];
                _this.loadNext();
            };
            this.loadChildViews = function (onLoad, views, index) {
                if (index === void 0) { index = 0; }
                if (!views) {
                    views = _this.getChildViewNames(_this.view);
                }
                if (views.length == index) {
                    if (onLoad) {
                        onLoad();
                    }
                    return;
                }
                var viewName = views[index];
                _this.loadChildView(viewName, function () {
                    _this.loadChildViews(onLoad, views, index + 1);
                });
            };
            this.loadView = function () {
                _this.view.load({
                    onLoad: function (e) {
                        _this.loadChildViews(function () {
                            _this.onLoad(e);
                        });
                    },
                    args: _this.viewArgs,
                    handleEvents: true
                });
            };
            this.loadNext = function () {
                if (_this.view) {
                    _this.view.deleteEventHandler('load', _this.loadNext);
                }
                _this.viewName += '/' + _this.views[_this.index];
                _this.view = _this.viewCollection.get(_this.viewName);
                if (_this.view.getElement() == null) {
                    _this.loadDefault();
                    return;
                }
                if (++_this.index == _this.views.length) {
                    _this.loadView();
                    return;
                }
                if (_this.view.isActive()) {
                    _this.loadNext();
                }
                else {
                    _this.view.addEventHandler('load', _this.loadNext);
                    _this.loadView();
                }
            };
            this.load = function (name, args, onLoad) {
                _this.onLoad = onLoad;
                if (!name) {
                    name = _this.findViewPath();
                }
                _this.viewArgs = !args ? _this.getUrlParams() : args;
                _this.index = 1;
                _this.views = name.split('/');
                if (_this.views.length < 2) {
                    _this.loadDefault();
                    return;
                }
                _this.viewName = _this.views[0];
                _this.loadNext();
            };
        }
        ViewLoader.prototype.getUrlParams = function () {
            var match;
            var pl = /\+/g;
            var search = /([^&=]+)=?([^&]*)/g;
            var decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            };
            var query = window.location.search.substring(1);
            var params = {};
            while (match = search.exec(query)) {
                params[decode(match[1])] = decode(match[2]);
            }
            return params;
        };
        ViewLoader.prototype.findViewPath = function () {
            return window.location.pathname
                .replace(/\/+/g, '\/')
                .replace(/\/$|^\//g, '');
        };
        ViewLoader.prototype.getChildViewNames = function (view) {
            var el = view.getElement();
            var children = el.querySelectorAll("[data-view-parent=\"" + view.getName() + "\"]");
            var views = [];
            for (var i = 0; i < children.length; i++) {
                el = children[i];
                var attr = el.getAttribute('data-view');
                if (attr) {
                    var viewName = attr;
                    views.push(viewName);
                }
            }
            return views;
        };
        ViewLoader = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(viewCollection_1.ViewCollection))
        ], ViewLoader);
        return ViewLoader;
    }());
    exports.ViewLoader = ViewLoader;
});
//# sourceMappingURL=viewLoader.js.map