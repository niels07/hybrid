define(["require", "exports", "lib/di/serviceProvider", "core/http", "core/config", "core/view", "./app/polyfillLoader"], function (require, exports, serviceProvider_1, http_1, config_1, view_1, polyfillLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PolyfillLoader = polyfillLoader_1.PolyfillLoader;
    var App = /** @class */ (function () {
        function App(configPath) {
            this.configPath = configPath;
            this.provider = serviceProvider_1.ServiceProvider.getDecoratorProvider();
        }
        App.prototype.dispatch = function () {
            var _this = this;
            var viewManager = this.provider.resolve(view_1.ViewManager);
            var configCollection = new config_1.ConfigCollection();
            var configHandler = new config_1.ConfigHandler(this.provider.resolve(http_1.XHRequestFactory), viewManager, this.provider, configCollection);
            window.addEventListener('popstate', function (e) {
                viewManager.loadView();
            });
            configHandler.parseConfig(this.configPath, function () {
                var dpPath = configCollection.get('dispatcher');
                if (!dpPath) {
                    dpPath = './app/appDispatcher';
                }
                var dpNs = dpPath.split('/');
                var dpName = dpNs[dpNs.length - 1];
                dpName = dpName.charAt(0).toUpperCase() + dpName.slice(1);
                require([dpPath], function (args) {
                    var dpClass = args[dpName];
                    _this.provider.register(dpClass).singleton();
                    var dispatcher = _this.provider.resolve(dpClass);
                    dispatcher.invoke();
                });
            });
        };
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=app.js.map