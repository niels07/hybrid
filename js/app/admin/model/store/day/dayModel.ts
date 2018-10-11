import { DataModel, ModelInit } from 'core/model'

interface DayModelInit extends ModelInit {
    name: string;
    open: string;
    closed: string;
}

export class DayModel extends DataModel {
    private name: string;
    private open: string;
    private closed: string;

    constructor(data?: DayModelInit) {
        super(data);
    }

    getName = (): string => {
        return this.name;
    }

    getOpen = (): string => {
        return this.open;
    }

    getClosed = (): string => {
        return this.closed;
    }
}