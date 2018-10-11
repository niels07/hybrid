import { Decorator } from './decorator';

export function singleton(): any {
    return function (target: any) {
        Decorator.registerSingleton(target);
    };
}

