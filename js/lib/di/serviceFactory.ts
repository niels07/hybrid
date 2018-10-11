import { Param } from './param';
import { Ctor } from './ctor';
import { Factory } from './factory';
import { Dict } from '../collection/dict';
import { ServiceContainer } from './serviceContainer';

export abstract class ServiceFactory implements Factory {

    private instance: any = null;
    private params: Dict<Param>;
    private __container: ServiceContainer;

    constructor(private type: Ctor) {
        this.params = {};
        this.type = type;
    }

    private getCtorName(type: Ctor): string {
        return type.toString().match(/function (\w*)/)![1];
    }

    public addParam(name: string, param: Param): void {
        this.params[name] = param;
    }

    private getInstance(type: Ctor, args: Array<any>): any {
        var service = this.__container.getService(type);

        if (!service) {
            var name = this.getCtorName(type);
            throw new Error(`requested service '${name}' not found`);
        }
        var instance = this.__container.resolveService(service, args);

        if (!instance) {
            var name = this.getCtorName(type);
            throw new Error(`requested service '${name}' not found`);
        }

        if (!(instance instanceof this.type)) {
            throw new TypeError('factory does not provide the requested service type');
        }
        return instance;
    }

    create(...args: any[]): any {
        var type: Ctor;
        if (args.length > 0 && typeof args[0] === 'function' && this.__container.getService(args[0])) {
            type = args[0];
            args.shift();
        } else {
            type = this.type;
        }
        return this.getInstance(type, args);
    }
}
