import { service } from 'lib/di';
import { ImageModelInit } from './imageModelInit';
import { DataModel } from 'core/model';

@service()
export class ImageModel extends DataModel {
    private id: number;
    private productId: number;
    private path: string;
    private type: string;

    constructor(init: ImageModelInit) {
        super(init);
    }

    getId = (): number => {
        return this.id;
    }

    getProductId = (): number => {
        return this.productId;
    }

    getPath = (): string => {
        return this.path;
    }

    getType = (): string => {
        return this.type;
    }
}