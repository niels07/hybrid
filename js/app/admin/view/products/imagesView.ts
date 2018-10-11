import { BaseView, callback, onLoad } from 'core/view';
import { inject } from 'lib/di';
import { ProductModel } from '../../model/product/productModel';
import { XHRequestHandler } from 'core/http';
import { ImageModel } from '../../model/product/image/imageModel';
import { ImageFactory } from '../../model/product/image/imageFactory';
import { Output } from '../../io/output';

export class ImagesView extends BaseView {

    private product: ProductModel;
    private images: Array<ImageModel>

    constructor(
        @inject(Output) private output: Output,
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(ImageFactory) private imageFactory: ImageFactory) {
        super('admin/products/images');
        this.images = [];
    }

    protected getListElement = (): HTMLUListElement => {
        return <HTMLUListElement>this.getElement('#admin-product-images');
    }

    protected deleteImage = (name: string, index: number): void => {
        var el = document.getElementById('image-' + name);
        if (el) {
            el.outerHTML = '';
        }
        this.images.splice(index, 1);
    }

    protected addImageElement = (name: string, text: string): void => {
        var ul = document.getElementById('admin-product-images');
        if (!ul) {
            return;
        }
        var li = document.createElement('li');
        var a = document.createElement('a');
        var index = this.images.length - 1;

        li.id = 'image-' + name;
        a.className = 'deleteItem';
        a.href = '';
        a.onclick = (e) => {
            e.preventDefault();
            this.deleteImage(name, index);
        }
        a.appendChild(document.createTextNode('Verwijderen'));
        li.appendChild(document.createTextNode(text));
        li.appendChild(a);
        ul.appendChild(li);
    }

    private getImageName = (path: string) => {
        return path.toLowerCase()
            .replace(/^\/|\/$/g, '')
            .replace(/(\/| |\.)+/g, '-');
    }

    private getImageText = (path: string): string => {
        if (path.length <= 25) {
            return path;
        }
        var part1 = path.substring(0, 12);
        var part2 = path.substring(path.length - 12, path.length);
        return `${part1}...${part2}`;
    }

    addImageItem = (item: ImageModel): void => {
        if (!item) { return; }
        var path = item[0];
        var name = this.getImageName(path);
        var text = this.getImageText(path);
        this.addImageElement(name, text);
    }

    loadImages = (product: ProductModel) => {
        this.product = product;
        var images = product.getImages();
        if (!images) {
            return;
        }
        var list = this.getListElement();
        list.innerHTML = '';

        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            this.addImageItem(image);
            this.images.push(image);
        }
    }

    protected getImage = (): ImageModel | undefined => {
        var path = (<HTMLInputElement>document.getElementById('admin-product-image-path')).value;
        if (path == '') {
            return undefined;
        }
        var type = (<HTMLInputElement>document.getElementById('admin-product-image-type')).value;
        return this.imageFactory.create({
            path: path,
            type: type
        });
    }

    getImages = (): Array<ImageModel> => {
        return this.images;
    }

    clear = (): void => {
        var list = this.getListElement();
        this.images = [];
        list.innerHTML = '';
    }

    private addProductImage = (url: string, type: string): void => {
        if (type == 'thumbnail') {
            (<HTMLInputElement>document.getElementById('admin-product-image')).value = url;
            return;
        }
        var image = this.imageFactory.create({
            path: url,
            type: type
        });
        if (!image) {
            image = this.getImage();
        }
        if (image) {
            this.images.push(image);
            this.addImageItem(image);
        }
        this.product.addImage(image);
    }

    @onLoad()
    onViewLoad = (): void => {
        addEventListener('ProductSelectionChanged', (e: CustomEvent) => {
            this.loadImages(<ProductModel>e.detail);
        });
    }

    @callback()
    addImage = (): void => {
        var type = (<HTMLInputElement>document.getElementById('admin-product-image-type')).value;
        var path = (<HTMLInputElement>document.getElementById('admin-product-image-path')).value;
        this.addProductImage(path, type);
    }

    @callback()
    uploadImage = (): void => {
        var input = <HTMLInputElement>document.querySelector('#admin-products .image-uploader-file');
        if (!input || !input.files) {
            return;
        }
        this.requestHandler.sendRequest({
            route: 'admin/product',
            action: 'uploadImage',
            data: {
                image: input.files[0],
                name: input.value
            }
        }).then(r => {
            var path = r.getData('path');
            var type = r.getData('type')
            this.output.write('Afbeelding is geupload: ' + path);
            this.addProductImage(path, type);
        }, e => {
            this.output.write('Kon de afbeelding niet uploaden: ' + e);
        });
    }
}
