import { BaseView } from "./baseView";
import { Decorator } from './decorator';

export function callback(): any {
    return function (view: BaseView, handlerName: string, descriptor: PropertyDescriptor) {
        Decorator.callback(view, handlerName); 
    };
}