define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigHandler = /** @class */ (function () {
        function ConfigHandler(requestFactory, viewManager, provider, configCollection) {
            var _this = this;
            this.requestFactory = requestFactory;
            this.viewManager = viewManager;
            this.provider = provider;
            this.configCollection = configCollection;
            this.loadNextView = function () {
                var viewConfig = _this.configs[_this.index];
                var module = viewConfig['module'];
                var className = viewConfig['class'];
                var path = viewConfig['path'];
                var use = viewConfig['use'];
                require([module], function (args) {
                    var ctor = args[className];
                    var register = _this.provider.register(ctor);
                    if (use) {
                        for (var i in use) {
                            register.resolveParam(i, use[i]);
                        }
                    }
                    _this.viewManager.registerView(path, ctor);
                    if (++_this.index == _this.configs.length) {
                        _this.handleSettings();
                        _this.onLoad();
                    }
                    else {
                        _this.loadNextView();
                    }
                });
            };
        }
        ConfigHandler.prototype.handleSettings = function () {
            if (!('settings' in this.config)) {
                return;
            }
            var settings = this.config['settings'];
            if ('defaultView' in settings) {
                this.viewManager.setDefaultView(settings['defaultView']);
            }
            this.configCollection.setData(settings);
        };
        ConfigHandler.prototype.registerViews = function () {
            if (!('views' in this.config)) {
                return;
            }
            this.configs = this.config['views'];
            this.index = 0;
            this.loadNextView();
        };
        ConfigHandler.prototype.parseConfig = function (path, onLoad) {
            var _this = this;
            this.onLoad = onLoad;
            var xhr = this.requestFactory.create(path, 'GET');
            xhr.setOnLoad(function () {
                var response = xhr.getResponse();
                _this.config = JSON.parse(response);
                _this.handleSettings();
                _this.registerViews();
            });
            xhr.setOnError(function () {
                var response = xhr.getResponse();
                var result = JSON.parse(response);
                throw new Error(result);
            });
            xhr.send(); /*.then(() => {
                console.log('test 2');
                var response = xhr.getResponse();
                this.config = JSON.parse(response);
                this.handleSettings();
                this.registerViews()
            }, e => {
                var response = xhr.getResponse();
                var result = JSON.parse(response);
                throw new Error(e);
            });*/
        };
        return ConfigHandler;
    }());
    exports.ConfigHandler = ConfigHandler;
});
//# sourceMappingURL=configHandler.js.map