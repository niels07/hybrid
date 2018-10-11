import { Dict } from '../collection/dict';
import { Ctor } from './ctor';
import { Param } from './param';

export interface Factory {
    create(...args: any[]): any;
    addParam(name: string, param: Param): void;
}


