
import { DayModel } from './day/dayModel';

export interface StoreModelInit {
    id: number,
    name: string,
    street: string,
    streetNumber: string,
    zipcode: string,
    city: string,
    country: string,
    phone: string,
    email: string,
    days?: Array<DayModel> | string
}