import { Decorator } from './decorator';

export function service(): any {
    return function (target: any) {
        Decorator.registerService(target);
    };
}

