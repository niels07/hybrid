var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "./viewLoader", "./pageView", "./viewCollection", "lib/di", "core/promise"], function (require, exports, viewLoader_1, pageView_1, viewCollection_1, di_1, promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewManager = /** @class */ (function () {
        function ViewManager(viewCollection, viewLoader, promiseFactory) {
            var _this = this;
            this.viewCollection = viewCollection;
            this.viewLoader = viewLoader;
            this.promiseFactory = promiseFactory;
            this.getNavClickHandler = function (name) {
                return function () {
                    _this.loadView({ name: name, args: {} });
                    return false;
                };
            };
            this.loadNav = function (el) {
                var a = el;
                var name = el.getAttribute('data-nav');
                a.href = 'javascript:void(0)';
                if (name) {
                    a.onclick = _this.getNavClickHandler(name);
                }
            };
            this.loadNavs = function () {
                var navs = document.querySelectorAll('[data-nav]');
                for (var i = 0; i < navs.length; i++) {
                    _this.loadNav(navs[i]);
                }
            };
            this.setDefaultView = function (viewName) {
                _this.defaultViewName = viewName;
                _this.viewLoader.setDefaultView(viewName);
            };
            this.getView = function (name) {
                return _this.viewCollection.get(name);
            };
            this.registerView = function (name, type) {
                _this.viewCollection.set(name, type);
            };
            this.viewActive = function (name) {
                if (!_this.viewCollection.contains(name)) {
                    return false;
                }
                var view = _this.viewCollection.get(name);
                return view.isActive();
            };
            this.refreshView = function (views, index) {
                if (index == views.length) {
                    return;
                }
                var view = views[index++];
                if (!view.isActive()) {
                    _this.refreshView(views, index);
                }
                view.load({
                    onLoad: function () {
                        _this.refreshView(views, index);
                    },
                    handleEvents: true
                });
            };
            this.refreshViews = function () {
                var views = _this.viewCollection.toArray();
                _this.refreshView(views, 0);
            };
            this.hideView = function (name) {
                if (_this.viewCollection.contains(name)) {
                    var view = _this.viewCollection.get(name);
                    view.hide();
                }
            };
            this.hideViews = function () {
                var views = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    views[_i] = arguments[_i];
                }
                for (var i = 0; i < views.length; i++) {
                    _this.hideView(views[i]);
                }
            };
            this.hideOtherPages = function (view) {
                _this.viewCollection.each(function (view2) {
                    if (view2 instanceof pageView_1.PageView && view2 !== view && view2.isActive()) {
                        view2.hide();
                    }
                });
            };
            this.loadView = function (loadViewArgs) {
                var name;
                var args;
                if (loadViewArgs) {
                    name = loadViewArgs.name;
                    args = loadViewArgs.args;
                }
                var view = loadViewArgs && loadViewArgs.name ? _this.getView(loadViewArgs.name) : undefined;
                return _this.promiseFactory.create(function (resolve, reject) {
                    _this.viewLoader.load(name, args, function () {
                        if (view instanceof pageView_1.PageView) {
                            _this.hideOtherPages(view);
                        }
                        _this.loadNavs();
                        if (!view) {
                            view = _this.getView(_this.defaultViewName);
                        }
                        resolve(view);
                    });
                });
            };
            this.loadNavs();
        }
        ViewManager.prototype.viewLoaded = function (name) {
            return this.getView(name).isLoaded();
        };
        ViewManager = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(viewCollection_1.ViewCollection)),
            __param(1, di_1.inject(viewLoader_1.ViewLoader)),
            __param(2, di_1.inject(promise_1.PromiseFactory))
        ], ViewManager);
        return ViewManager;
    }());
    exports.ViewManager = ViewManager;
});
//# sourceMappingURL=viewManager.js.map