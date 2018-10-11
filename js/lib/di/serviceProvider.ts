import { ServiceData } from './serviceData';
import { Ctor } from './ctor';
import { Registration } from './registration';
import { Decorator } from './decorator';
import { ServiceContainer } from './serviceContainer';
import { ServiceFactory } from './serviceFactory';
import { InjectionsDict } from './injectionDict';

export class ServiceProvider {

    private injections: InjectionsDict = {}; 
    private services: { [key: string]: ServiceData} = {};
    private container: ServiceContainer;

    constructor() {
        this.container = new ServiceContainer(this.injections, this.services, this);
    }

    static getDecoratorProvider() {
        return Decorator.getProvider();
    }

    getService = (id: string | Ctor | null): ServiceData | undefined => {
        var key: string;
        if (typeof id === 'string') {
            key = id;
        } else if (id) {
            key = id.toString().match(/function (\w*)/)![1];
        } else {
            return undefined;
        }
        return key in this.services ? this.services[key] : undefined;
    }

    private getInstance = (service: ServiceData, args: any[]) => {
        var instance = (!args || args.length == 0) 
            ? (<ServiceData>service).resolve.apply(null)
            : (<ServiceData>service).resolve.apply(null, args);

        if (instance instanceof ServiceFactory) {
            instance['__container'] = this.container;
        }
        return instance;
    }

    protected createRegistration = (type: Ctor): Registration  => {
        return new Registration(type, this.container);
    }
    
    resolveParam(id: string | Ctor | null): any {
        var service = this.getService(id);
        
        if (!(service instanceof ServiceData)) {
            return service;
        }
        
        var args = this.getInjections(service);
        return this.getInstance(service, args);
    }

    private getInjectArgs = (params: Array<string | Ctor | null>): Array<any> => {
        var args = [];
        for (var i = 0; i < params.length; i++) {
            if (params[i]) {
                var item = this.resolveParam(params[i]);
                args.push(item);
            }
        }
        return args;
    }

    protected getInjections = (service: ServiceData): Array<any> => {
        var name = service.getType().toString().match(/function (\w*)/)![1];
        if (!(name in this.injections)) {
            return [];
        }
        var params = this.injections[name];
        return this.getInjectArgs(params);
    }

    inject(target: any, funcName: string, service: string | Ctor, idx: number): void {
        var name = target.toString().match(/^function\s*([^\s(]+)/)[1];
        if (!(name in this.injections)) {
            this.injections[name] = [];
        }
        var injects = this.injections[name];
        while (injects.length <= idx) {
            injects.push(null);
        }
        injects[idx] = service;
    }

    register(type: Ctor): Registration {
        return this.createRegistration(type);
    }

    resolve(type: Ctor, ...args: any[]): any {
        var id = type.toString().match(/function (\w*)/)![1];

        var service = this.getService(id);
        if (!(service instanceof ServiceData)) {
            return service;
        }
        if (!args || args.length == 0) {
            args = this.getInjections(service);
        }
       
        return this.getInstance(service, args); 
    }

}
