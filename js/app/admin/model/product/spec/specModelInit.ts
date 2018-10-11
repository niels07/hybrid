import { ModelInit } from 'core/model';

export interface SpecModelInit extends ModelInit {
    id?: number;
    productId?: number;
    name: string;
    value: string;
}