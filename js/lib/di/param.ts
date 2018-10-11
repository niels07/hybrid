import { ServiceData } from './serviceData';
import { ServiceContainer } from './serviceContainer';

export class Param {
    public constructor(
        private value: any,
        private container: ServiceContainer,
        private args: Array<any> = []) {
    }

    public getValue(): any {
        return (this.value instanceof ServiceData) 
            ? this.container.resolveService(this.value, this.args)
            : this.value;
    }

}
