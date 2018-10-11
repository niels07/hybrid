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
define(["require", "exports", "lib/di", "core/model"], function (require, exports, di_1, model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductModel = /** @class */ (function (_super) {
        __extends(ProductModel, _super);
        function ProductModel(modelInit) {
            var _this = _super.call(this, modelInit) || this;
            _this.getId = function () {
                return _this.id;
            };
            _this.getCategoryId = function () {
                return _this.categoryId;
            };
            _this.getTitle = function () {
                return _this.title;
            };
            _this.getName = function () {
                return _this.name;
            };
            _this.getDescription = function () {
                return _this.description;
            };
            _this.getThumbnail = function () {
                return _this.thumbnail;
            };
            _this.getSku = function () {
                return _this.sku;
            };
            _this.getPrice = function () {
                return _this.price;
            };
            _this.getActionPrice = function () {
                return _this.actionPrice;
            };
            _this.getStoreUrl = function () {
                return _this.storeUrl;
            };
            _this.getSpecs = function () {
                return _this.specs;
            };
            _this.getImages = function () {
                return _this.images;
            };
            _this.addImage = function (image) {
                _this.images.push(image);
            };
            return _this;
        }
        ProductModel = __decorate([
            di_1.service()
        ], ProductModel);
        return ProductModel;
    }(model_1.DataModel));
    exports.ProductModel = ProductModel;
});
//# sourceMappingURL=productModel.js.map