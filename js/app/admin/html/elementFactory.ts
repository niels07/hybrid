import { ServiceFactory, singleton } from 'lib/di';
import { BaseElement } from './baseElement';

@singleton()
export class ViewFactory extends ServiceFactory {
    constructor() {
        super(BaseElement);
    }
}
