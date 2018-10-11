import { XHRequestHandler } from 'core/http';
import { GenericModelManager } from '../../genericModelManager';
import { ImageModel } from './imageModel';
import { ImageFactory } from './imageFactory';
import { singleton, inject } from 'lib/di';

@singleton()
export class ImageManager extends GenericModelManager<ImageModel> {

    constructor(
        @inject(XHRequestHandler) requestHandler: XHRequestHandler,
        @inject(ImageFactory) imageFactory: ImageFactory) {
        super(requestHandler, imageFactory, 'admin/store');
    }
}
 