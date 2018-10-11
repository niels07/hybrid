
import { service } from 'lib/di';
import { DayModel } from './day/dayModel';

@service()
export class StoreModel {
    constructor(
        private id: number,
        private name: string,
        private street: string,
        private streetNumber: string,
        private zipcode: string,
        private city: string,
        private country: string,
        private phone: string,
        private email: string,
        private days: Array<DayModel>) {
    }

    getId = (): number => {
        return this.id;
    }

    getName = (): string => {
        return this.name;
    }

    getStreet = (): string => {
        return this.street;
    }

    getStreetNumber = (): string => {
        return this.streetNumber;
    }

    getCity = (): string => {
        return this.city;
    }

    getZipcode = (): string => {
        return this.zipcode;
    }

    getCountry = (): string => {
        return this.country;
    }

    getPhone = (): string => {
        return this.phone;
    }

    getEmail = (): string => {
        return this.email;
    }

    getDays = (): Array<DayModel> => {
        return this.days;
    }
}