import {AppState} from "../Model/AppState";
import {Currency} from "../Model/Currency";

export const initialExchangeWidgetState: AppState = {
    pockets: [
        {
            currency: Currency.EUR,
            value: '0.00'
        },
        {
            currency: Currency.GBP,
            value: '1000.00'
        },
        {
            currency: Currency.USD,
            value: '0.00'
        }
    ],
    to: {
        currency: Currency.USD,
        value: ''
    },
    from: {
        currency: Currency.GBP,
        value: ''

    },
    rate: 1.13,
    rates: {
        [Currency.EUR]: 0.897935,
        [Currency.GBP]: 0.78255,
        [Currency.USD]: 1
    }

};
