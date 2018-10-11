import { ServiceFactory, singleton } from 'lib/di';
import { BaseView } from './baseView';

@singleton()
export class ViewFactory extends ServiceFactory {
    public constructor() {
        super(BaseView);
    }
}
