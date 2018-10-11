
import { ServiceFactory, singleton } from 'lib/di';
import { StoreModel } from './storeModel';
import { DayModel } from './day/dayModel';
import { StoreModelInit } from './storeModelInit';

@singleton()
export class StoreFactory extends ServiceFactory {

    public constructor() {
        super(StoreModel);
    }

    create(init: StoreModelInit): StoreModel {
        return super.create(init);
    }
}