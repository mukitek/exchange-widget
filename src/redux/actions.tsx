// action types
import {PocketPosition} from "../Model/PocketPosition";
import {Currency} from "../Model/Currency";
import {RatesMap} from "../Model/AppState";
import {AppThunk} from "../Model/AppThunk";

export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const UPDATE_RATES_REQUEST = 'UPDATE_RATES_REQUEST';
export const UPDATE_RATES_SUCCESS = 'UPDATE_RATES_SUCCESS';
export const UPDATE_RATES_FAILURE = 'UPDATE_RATES_FAILURE';
export const EXCHANGE_MONEY = 'EXCHANGE_MONEY';

// action type interfaces
interface UpdateCurrencyAction {
    type: typeof UPDATE_CURRENCY;
    currency: Currency;
    position: PocketPosition;
}

interface UpdateValueAction {
    type: typeof UPDATE_VALUE;
    value: string;
    position: PocketPosition;
}

interface UpdateRatesRequestAction {
    type: typeof UPDATE_RATES_REQUEST;
}

interface UpdateRatesSuccessAction {
    type: typeof UPDATE_RATES_SUCCESS;
    rates: RatesMap;
}

interface UpdateRatesFailureAction {
    type: typeof UPDATE_RATES_FAILURE;
}

interface ExchangeMoneyAction {
    type: typeof EXCHANGE_MONEY
}

// action creators
export function updateCurrency(currency: Currency, position: PocketPosition): UpdateCurrencyAction {
    return { type: UPDATE_CURRENCY, currency, position }
}

export function updateValue(value: string, position: PocketPosition): UpdateValueAction {
    return { type: UPDATE_VALUE, value, position }
}

export function exchangeMoney() : ExchangeMoneyAction {
    return { type: EXCHANGE_MONEY}
}

export function updateRatesRequest(): AppThunk {
    return async (dispatch) => {
        return fetch(`http://openexchangerates.org/api/latest.json?app_id=7df096213cf54d458e186ca050abf2a5`)
            .then(
                response => {
                    return response.json();
                },
                error => dispatch(updateRatesFailure(error))
            )
            .then(json => {
                console.log('json', json.rates);
                const rates:RatesMap = {
                    EUR: json.rates['EUR'],
                    GBP: json.rates['GBP'],
                    USD: json.rates['USD']
                };
                return dispatch(updateRatesSuccess(rates))
            })
    }
}

export function updateRatesSuccess(rates: RatesMap): UpdateRatesSuccessAction {
    return { type: UPDATE_RATES_SUCCESS, rates }
}

export function updateRatesFailure(error: any): UpdateRatesFailureAction {
    return { type: UPDATE_RATES_FAILURE }
}

export type ExchangeWidgetTypes = UpdateValueAction | UpdateCurrencyAction | ExchangeMoneyAction;
export type ExchangeWidgetAsyncTypes = UpdateRatesSuccessAction | UpdateRatesFailureAction | UpdateRatesRequestAction | any;

