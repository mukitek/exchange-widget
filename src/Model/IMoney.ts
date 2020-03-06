import {Currency} from "./Currency";

export interface IMoney {
    currency: Currency;
    value: string;
}

export interface IMoneyWithBalance extends IMoney {
    balance: string
}
