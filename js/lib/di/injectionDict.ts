import { Ctor } from './ctor';

export type InjectionsDict = { [key: string]: Array<string | Ctor | null> };
