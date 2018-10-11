import { ViewManager } from '../view/viewManager';
import { Factory, ServiceProvider, Registration } from 'lib/di';
import { ConfigCollection } from './configCollection';
import { XHRequest } from '../http';

declare function require(
    moduleNames: string[],
    onLoad: (...args: any[]) => void
): void

type Config = { [key: string]: any };

export class ConfigHandler {
    private index: number;
    private configs: Array<Config>;
    private onLoad: () => void;
    private config: Config;

    constructor(
        private requestFactory: Factory,
        private viewManager: ViewManager,
        private provider: ServiceProvider,
        private configCollection: ConfigCollection) {
    }

    private loadNextView = (): void => {
        var viewConfig = this.configs[this.index];
        var module = viewConfig['module'];
        var className = viewConfig['class'];
        var path = viewConfig['path'];
        var use = viewConfig['use'];
         
        require([module], (args) => {
            var ctor = args[className];
            var register = this.provider.register(ctor);
            if (use) {
                for (var i in use) {
                    register.resolveParam(i, use[i]);
                }
            }
            this.viewManager.registerView(path, ctor);
            if (++this.index == this.configs.length) {
                this.handleSettings();
                this.onLoad();
            } else {
                this.loadNextView();
            }
        });
    }
    
    private handleSettings(): void {
        if (!('settings' in this.config)) {
            return;
        }

        var settings = this.config['settings'];
        if ('defaultView' in settings) {
            this.viewManager.setDefaultView(settings['defaultView']);
        }

        this.configCollection.setData(settings);
    }
    
    private registerViews() {
        if (!('views' in this.config)) {
            return;
        }
        this.configs = this.config['views'];
        this.index = 0;
        this.loadNextView();
    }

    public parseConfig(path: string, onLoad: () => void): void {
        this.onLoad = onLoad;
        var xhr: XHRequest = this.requestFactory.create(path, 'GET');
        xhr.setOnLoad(() => {
            var response = xhr.getResponse();
            this.config = JSON.parse(response);
            this.handleSettings();
            this.registerViews()
        });

        xhr.setOnError(() => {
            var response = xhr.getResponse();
            var result = JSON.parse(response);
            throw new Error(result);
        });
        xhr.send() /*.then(() => {
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
    }
}
