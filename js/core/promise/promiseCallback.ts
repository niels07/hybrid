export type PromiseCallback<T> = (resolve: (value: T) => void, reject: (reason: any) => void) => void;
