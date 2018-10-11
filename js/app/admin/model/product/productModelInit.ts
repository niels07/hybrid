import { ModelInit } from 'core/model';
import { ImageModel } from './image/imageModel';
import { SpecModel } from './spec/specModel';

export interface ProductModelInit extends ModelInit {
    id: string;
    categoryId: number;
    title: string;
    name: string;
    description: string;
    thumbnail: string;
    sku: string;
    price: number;
    actionPrice: number;
    storeUrl: string;
    specs: Array<SpecModel>,
    images: Array<ImageModel>
}