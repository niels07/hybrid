var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "core/view", "lib/di", "core/http", "../../model/product/image/imageFactory", "../../io/output"], function (require, exports, view_1, di_1, http_1, imageFactory_1, output_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImagesView = /** @class */ (function (_super) {
        __extends(ImagesView, _super);
        function ImagesView(output, requestHandler, imageFactory) {
            var _this = _super.call(this, 'admin/products/images') || this;
            _this.output = output;
            _this.requestHandler = requestHandler;
            _this.imageFactory = imageFactory;
            _this.getListElement = function () {
                return _this.getElement('#admin-product-images');
            };
            _this.deleteImage = function (name, index) {
                var el = document.getElementById('image-' + name);
                if (el) {
                    el.outerHTML = '';
                }
                _this.images.splice(index, 1);
            };
            _this.addImageElement = function (name, text) {
                var ul = document.getElementById('admin-product-images');
                if (!ul) {
                    return;
                }
                var li = document.createElement('li');
                var a = document.createElement('a');
                var index = _this.images.length - 1;
                li.id = 'image-' + name;
                a.className = 'deleteItem';
                a.href = '';
                a.onclick = function (e) {
                    e.preventDefault();
                    _this.deleteImage(name, index);
                };
                a.appendChild(document.createTextNode('Verwijderen'));
                li.appendChild(document.createTextNode(text));
                li.appendChild(a);
                ul.appendChild(li);
            };
            _this.getImageName = function (path) {
                return path.toLowerCase()
                    .replace(/^\/|\/$/g, '')
                    .replace(/(\/| |\.)+/g, '-');
            };
            _this.getImageText = function (path) {
                if (path.length <= 25) {
                    return path;
                }
                var part1 = path.substring(0, 12);
                var part2 = path.substring(path.length - 12, path.length);
                return part1 + "..." + part2;
            };
            _this.addImageItem = function (item) {
                if (!item) {
                    return;
                }
                var path = item[0];
                var name = _this.getImageName(path);
                var text = _this.getImageText(path);
                _this.addImageElement(name, text);
            };
            _this.loadImages = function (product) {
                _this.product = product;
                var images = product.getImages();
                if (!images) {
                    return;
                }
                var list = _this.getListElement();
                list.innerHTML = '';
                for (var i = 0; i < images.length; i++) {
                    var image = images[i];
                    _this.addImageItem(image);
                    _this.images.push(image);
                }
            };
            _this.getImage = function () {
                var path = document.getElementById('admin-product-image-path').value;
                if (path == '') {
                    return undefined;
                }
                var type = document.getElementById('admin-product-image-type').value;
                return _this.imageFactory.create({
                    path: path,
                    type: type
                });
            };
            _this.getImages = function () {
                return _this.images;
            };
            _this.clear = function () {
                var list = _this.getListElement();
                _this.images = [];
                list.innerHTML = '';
            };
            _this.addProductImage = function (url, type) {
                if (type == 'thumbnail') {
                    document.getElementById('admin-product-image').value = url;
                    return;
                }
                var image = _this.imageFactory.create({
                    path: url,
                    type: type
                });
                if (!image) {
                    image = _this.getImage();
                }
                if (image) {
                    _this.images.push(image);
                    _this.addImageItem(image);
                }
                _this.product.addImage(image);
            };
            _this.onViewLoad = function () {
                addEventListener('ProductSelectionChanged', function (e) {
                    _this.loadImages(e.detail);
                });
            };
            _this.addImage = function () {
                var type = document.getElementById('admin-product-image-type').value;
                var path = document.getElementById('admin-product-image-path').value;
                _this.addProductImage(path, type);
            };
            _this.uploadImage = function () {
                var input = document.querySelector('#admin-products .image-uploader-file');
                if (!input || !input.files) {
                    return;
                }
                _this.requestHandler.sendRequest({
                    route: 'admin/product',
                    action: 'uploadImage',
                    data: {
                        image: input.files[0],
                        name: input.value
                    }
                }).then(function (r) {
                    var path = r.getData('path');
                    var type = r.getData('type');
                    _this.output.write('Afbeelding is geupload: ' + path);
                    _this.addProductImage(path, type);
                }, function (e) {
                    _this.output.write('Kon de afbeelding niet uploaden: ' + e);
                });
            };
            _this.images = [];
            return _this;
        }
        __decorate([
            view_1.onLoad()
        ], ImagesView.prototype, "onViewLoad", void 0);
        __decorate([
            view_1.callback()
        ], ImagesView.prototype, "addImage", void 0);
        __decorate([
            view_1.callback()
        ], ImagesView.prototype, "uploadImage", void 0);
        ImagesView = __decorate([
            __param(0, di_1.inject(output_1.Output)),
            __param(1, di_1.inject(http_1.XHRequestHandler)),
            __param(2, di_1.inject(imageFactory_1.ImageFactory))
        ], ImagesView);
        return ImagesView;
    }(view_1.BaseView));
    exports.ImagesView = ImagesView;
});
//# sourceMappingURL=imagesView.js.map