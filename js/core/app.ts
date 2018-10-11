import { ServiceProvider } from 'lib/di/serviceProvider';
import { XHRequestFactory } from 'core/http';
import { XHRequestHandler } from 'core/http';
import { ConfigHandler, ConfigCollection } from 'core/config';
import { ViewLoader, ViewManager, ViewCollection, BaseView } from 'core/view';

export { Dispatcher } from './app/dispatcher';
export { PolyfillLoader } from './app/polyfillLoader';

declare function require(
    moduleNames: string[],
    onLoad: (...args: any[]) => void
): void

export class App {
    private provider: ServiceProvider;

    constructor(private configPath: string) {
        this.provider = ServiceProvider.getDecoratorProvider();
    }

    dispatch() {
        var viewManager = this.provider.resolve(ViewManager);
        var configCollection = new ConfigCollection();

        var configHandler = new ConfigHandler(
            this.provider.resolve(XHRequestFactory),
            viewManager,
            this.provider,
            configCollection
        );

        window.addEventListener('popstate', (e) => {
            viewManager.loadView(); 
        });

        configHandler.parseConfig(this.configPath, () => {
            var dpPath = <string>configCollection.get('dispatcher');
            if (!dpPath) {
                dpPath = './app/appDispatcher';
            }

            var dpNs = dpPath.split('/');
            var dpName = dpNs[dpNs.length - 1];
            dpName = dpName.charAt(0).toUpperCase() + dpName.slice(1);

            require([<string>dpPath], (args) => {
                var dpClass = args[dpName];
                this.provider.register(dpClass).singleton();
                var dispatcher = this.provider.resolve(dpClass);
                dispatcher.invoke();
            });
        });
    }
}
