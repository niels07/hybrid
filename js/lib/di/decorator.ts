import { ServiceData } from './serviceData';
import { Factory } from './factory';
import { Ctor } from './ctor';
import { Registration } from './registration';
import { ServiceProvider } from './serviceProvider';

export class Decorator {

    private static serviceProvider: ServiceProvider;

    static inject(target: any, funcName: string, service: Ctor | string, idx: number): void {
        Decorator.getProvider().inject(target, funcName, service, idx);
    }

    static registerSingleton(service: any) {
        Decorator.getProvider().register(service).singleton();
    }

    static registerService(service: any) {
        Decorator.getProvider().register(service);
    }

    static getService = (id: string): ServiceData | undefined => {
        return Decorator.getProvider().getService(id);
    }

    static getProvider = (): ServiceProvider => {
        if (!Decorator.serviceProvider) {
            Decorator.serviceProvider = new ServiceProvider();
        }
        return Decorator.serviceProvider;
    }
}
