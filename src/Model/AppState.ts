import {IMoney} from "./IMoney";
import {Currency} from "./Currency";

export type AppState = AccountState & TransactionState & DataState

export type AccountState = {
    pockets: IMoney[],
}

export type TransactionState = {
    to: IMoney;
    from: IMoney;
    rate: number;
}

export type DataState = {
    rates: RatesMap;
}

export type RatesMap = { [cu in Currency]: number}
