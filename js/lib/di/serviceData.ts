import { Param } from './param';
import { Ctor  } from './ctor';
import { Dict  } from '../collection/dict';
import { ServiceContainer } from './serviceContainer';

export class ServiceData {

    private instance: any = null;
    private single: boolean = false;
    private params: Dict<Param>;

    constructor(
        private type: Ctor,
        private container: ServiceContainer) {
    }

    getType(): Ctor {
        return this.type;
    }

    private getParamNames(f: any): Array<string> {
        var fStr = f.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
        var names = fStr.slice(fStr.indexOf('(') + 1, fStr.indexOf(')')).match(/([^\s,]+)/g);
        return !names ? [] : names;
    }

    private construct(constructor: Ctor, args?: any): any {
        const f = function f(this: any) {
            constructor.apply(this, args);
        } as any;
        f.prototype = constructor.prototype;
        return new f();
    }

    private createInstance = (args: Array<any>): any => {
        return this.construct(this.type, args);
    }

    private loadParams = (args: Array<any>): Array<any> => {
        if (!this.params) {
            return args;
        }
        var paramNames = this.getParamNames(this.type);
        var params = [];
        var j = 0;

        for (var i = 0; i < paramNames.length; i++) {
            var name = paramNames[i];
            if (name in this.params) {
                var param = this.params[name];
                params.push(param.getValue());
            } else {
                params.push(args[j++]);
            }
        }
        for (; j < args.length; j++) {
            params.push(args[j]);
        }
        return params;
    }

    resolve = (...args: any[]): any => {
        var params = this.loadParams(args);

        if (!this.single) {
            return this.createInstance(params);
        }

        if (!this.instance) {
            this.instance = this.createInstance(params);
        }
        return this.instance;
    }

    setSingleInstance(): void {
        this.single = true;
    }

    addParam(name: string, value: any, args: Array<any> = []): void {
        if (!this.params) {
            this.params = {};
        }
        if (value instanceof Param) {
            this.params[name] = value;
        } else {
            this.params[name] = new Param(value, this.container, args); 
        }
    }
}
