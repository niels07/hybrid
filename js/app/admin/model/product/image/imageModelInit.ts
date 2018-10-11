import { ModelInit } from 'core/model';

export interface ImageModelInit extends ModelInit {
    id?: number;
    productId?: number;
    path: string;
    type: string;
}