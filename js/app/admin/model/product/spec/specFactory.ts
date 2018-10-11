
import { ServiceFactory, singleton } from 'lib/di';
import { SpecModel } from './specModel';
import { ArgumentError } from 'lib/errors';
import { SpecModelInit } from './specModelInit';

@singleton()
export class SpecFactory extends ServiceFactory {

    public constructor() {
        super(SpecModel);
    }

    create(init: SpecModelInit): SpecModel {
        return super.create(init);
    }
}