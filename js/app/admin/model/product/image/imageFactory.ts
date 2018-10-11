
import { ServiceFactory, singleton } from 'lib/di';
import { ImageModel } from './imageModel';
import { ArgumentError } from 'lib/errors';
import { ImageModelInit } from './imageModelInit';

@singleton()
export class ImageFactory extends ServiceFactory {

    public constructor() {
        super(ImageModel);
    }

    create(init: ImageModelInit) {
        return super.create(init);
    }
}