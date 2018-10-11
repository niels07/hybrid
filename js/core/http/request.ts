
export interface Request {
    open(): void;
    send(data: any): void;
    getResponse(): any;
}

