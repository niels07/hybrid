import { service, inject } from 'lib/di';
import { ImageModel } from './image/imageModel';
import { SpecModel } from './spec/specModel';
import { ImageFactory } from './image/imageFactory';
import { ProductModelInit } from './productModelInit';
import { DataModel } from 'core/model';

@service()
export class ProductModel extends DataModel {
    private id: number;
    private title: string;
    private name: string;
    private description: string;
    private thumbnail: string;
    private sku: string;
    private price: number;
    private actionPrice: number;
    private storeUrl: string;
    private specs: Array<SpecModel>;
    private images: Array<ImageModel>;
    private categoryId: number;

    constructor(modelInit: ProductModelInit) {
        super(modelInit);
    }

    getId = (): number => {
        return this.id;
    }

    getCategoryId = () => {
        return this.categoryId;
    }

    getTitle = (): string => {
        return this.title;
    }

    getName = (): string => {
        return this.name;
    }

    getDescription = (): string => {
        return this.description;
    }

    getThumbnail = (): string => {
        return this.thumbnail;
    }

    getSku = (): string => {
        return this.sku;
    }

    getPrice = (): number => {
        return this.price;
    }

    getActionPrice = (): number => {
        return this.actionPrice;
    }

    getStoreUrl = (): string => {
        return this.storeUrl;
    }

    getSpecs = (): Array<SpecModel> => {
        return this.specs;
    }

    getImages = (): Array<ImageModel> => {
        return this.images;
    }

    addImage = (image: ImageModel): void => {
        this.images.push(image);
    }
}