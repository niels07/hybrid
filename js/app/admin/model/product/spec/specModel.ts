import { service } from 'lib/di';
import { DataModel } from 'core/model';
import { SpecModelInit } from './specModelInit';

@service()
export class SpecModel extends DataModel {
    private id: number;
    private productId: number;
    private name: string;
    private value: string; 

    constructor(init: SpecModelInit) {
        super(init);
    }

    getId = (): number => {
        return this.id;
    }

    getProductId = (): number => {
        return this.productId;
    }

    getName = (): string => {
        return this.name;
    }

    getValue = (): string => {
        return this.value;
    }
}