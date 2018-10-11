import { ServiceData } from './serviceData';
import { Factory } from './factory';
import { ServiceProvider } from './serviceProvider';
import { ServiceFactory } from './serviceFactory';
import { Dict } from '../collection/dict';
import { Ctor } from './ctor';
import { Param } from './param';
import { InjectionsDict } from './injectionDict';

export class ServiceContainer {
    
    constructor(
        private injections: InjectionsDict,
        private services: Dict<ServiceData>,
        private serviceProvider: ServiceProvider) {
    }

    private getTypeName(type: Ctor): string {
        return type.toString().match(/function (\w*)/)![1];
    }

    getService = (type: Ctor): ServiceData | undefined => {
        return this.serviceProvider.getService(type);
    }

    setService = (type: Ctor) => {
        var name = this.getTypeName(type);
        this.services[name] = new ServiceData(type, this);
    }

    clearService = (id: string): void => {
        delete this.services[id];
    }

    createParam = (type: Ctor, args: Array<any> = []): Param => {
        var name = this.getTypeName(type);
        var service = this.services[name];

        if (service instanceof ServiceData) {
            if (!args) {
                args = [];
            }
            if (args.length == 0) {
                this.applyInjections(<ServiceData>service, args);
            }
        }
        return new Param(service, this, args);
    }

    private addInjectArgs = (args: Array<any>, params: Array<string | Ctor | null>): void => {
        for (var i = 0; i < params.length; i++) {
            if (params[i] != null && (args.length <= i || !args[i])) {
                var param = params[i];
                if (args.length <= i) {
                    args.push(this.serviceProvider.resolveParam(param));
                } else {
                    args[i] = this.serviceProvider.resolveParam(param);
                }
            }
        }
    }

    private applyInjections = (service: ServiceData, args: Array<any>): void => {
        var name = service.getType().toString().match(/function (\w*)/)![1];
        if (!(name in this.injections)) {
            return;
        }
        var params = this.injections[name];
        this.addInjectArgs(args, params);
    }

    resolveService = (s: Ctor | ServiceData, args?: Array<any>) => {
        var service = s instanceof ServiceData ? s : this.getService(s);
        if (!service) {
            return null;
        }
        if (!(service instanceof ServiceData)) {
            return service;
        }
        if (!args) {
            args = [];
        }

        this.applyInjections(<ServiceData>service, args);
   
        return (!args || args.length == 0) 
            ? service.resolve.apply(null)
            : service.resolve.apply(null, args);
    }
}

