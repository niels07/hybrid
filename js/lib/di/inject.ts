import { Decorator } from './decorator';
import { Ctor } from './ctor';

export function inject(serviceName: string | Ctor): any {
    return function (target: any, funcName: string, argIndex: number) {
        Decorator.inject(target, funcName, serviceName, argIndex);
    };
}

