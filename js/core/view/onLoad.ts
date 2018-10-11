import { BaseView } from './baseView';
import { Decorator } from './decorator';

export function onLoad(): any {
    return function (view: BaseView, handlerName: string, descriptor: PropertyDescriptor) {
        Decorator.onLoad(view, handlerName);
    };
}
