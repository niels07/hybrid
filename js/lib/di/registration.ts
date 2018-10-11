import { ServiceData } from './serviceData';
import { Factory } from './factory';
import { ServiceFactory } from './serviceFactory';
import { Ctor } from './ctor';
import { ServiceContainer } from './serviceContainer';
import { Param } from './param';

export class Registration {

    public constructor(private type: Ctor, private container: ServiceContainer) {
        this.container.setService(this.type);
    }

    private getService(): ServiceData | undefined {
        return this.container.getService(this.type);
    }

    public singleton(): Registration {
        var service = this.getService();
        if (service) {
            service.setSingleInstance();
        }
        return this;
    }

    public resolveParam(name: string, type: Ctor, ...args: any[]): Registration {
        var service = this.getService();
        if (service) {
            var param = this.container.createParam(type, args);
            service.addParam(name, param);
        }
        return this;
    }

    public valueParam(name: string, value: any): Registration {
        var param = new Param(value, this.container);
        var service = this.getService();
        if (service) {
            service.addParam(name, param);
        }
        return this;
    }
}
