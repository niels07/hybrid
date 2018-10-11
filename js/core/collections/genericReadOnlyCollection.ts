export interface GenericReadOnlyCollection<T> {
    get(name: string): T | undefined;
    contains(name: string): boolean;
    forEach(handler: () => boolean): void;
    forEach(handler: () => void): void;
    forEach(handler: (item: T) => void): void;
    forEach(handler: (item: T) => boolean): void;
    forEach(handler: (key: string, item: T) => void): void;
    forEach(handler: (key: string, item: T) => boolean): void;
}
