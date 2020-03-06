import {Currency} from "./Currency";

export const symbols: {[c in Currency]:string } = {
    [Currency.EUR]: '€',
    [Currency.GBP]: '£',
    [Currency.USD]: '$'
};
