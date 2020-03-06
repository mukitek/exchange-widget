import {AppState, RatesMap} from "../Model/AppState";
import {initialExchangeWidgetState} from "./initialState";
import {
    EXCHANGE_MONEY,
    ExchangeWidgetAsyncTypes,
    ExchangeWidgetTypes,
    UPDATE_CURRENCY,
    UPDATE_RATES_REQUEST,
    UPDATE_RATES_SUCCESS,
    UPDATE_VALUE
} from "./actions";
import {Currency} from "../Model/Currency";
import {PocketPosition} from "../Model/PocketPosition";


export function appReducer(state: AppState = initialExchangeWidgetState, action: ExchangeWidgetTypes | ExchangeWidgetAsyncTypes): AppState {
    switch (action.type) {
        case UPDATE_VALUE:
            if (action.position === PocketPosition.TO) {
                return {
                    ...state,
                    to: {...state.to, value: action.value},
                    from: {...state.from, value: calculateValue(action.value, 1/state.rate)}
                };
            } else {
                return {
                    ...state,
                    from: {...state.from, value: action.value},
                    to: {...state.to, value: calculateValue(action.value, state.rate)}
                };
            }
        case UPDATE_CURRENCY:
            if (action.position === PocketPosition.TO) {
                //if currency same as from currency flip from currency to old to currency
                const fromCurrency = action.currency === state.from.currency ? state.to.currency : state.from.currency;
                //calculate the new rate
                const newRate = calculateRate(fromCurrency, action.currency, state.rates);
                //calculate to value
                return {
                    ...state,
                    from: {...state.from, currency: fromCurrency},
                    to: {
                        ...state.to,
                        currency: action.currency,
                        value: calculateValue(state.from.value, newRate)
                    },
                    rate: newRate
                }
            } else {
                //if currency same as to currency flip to currency to old from currency
                const toCurrency = action.currency === state.to.currency ? state.from.currency : state.to.currency;
                //calculate the new rate
                const newRate = calculateRate(action.currency, toCurrency, state.rates);
                //calculate to value
                return {
                    ...state,
                    to: {...state.to, currency: toCurrency, value: calculateValue(state.from.value, newRate)},
                    from: {...state.from, currency: action.currency},
                    rate: newRate
                }
            }
        case EXCHANGE_MONEY:
            return {
                ...state,
                pockets: state.pockets.map(pocket => {
                    const deducted = parseFloat(pocket.value) - parseFloat(state.from.value);
                    const summed =  parseFloat(pocket.value) + parseFloat(state.to.value);
                    if (state.from.currency === pocket.currency) {
                        return {...pocket, value: !isNaN(deducted) && !isNaN(summed) ? formatValue(deducted): pocket.value};
                    } else if (state.to.currency === pocket.currency) {
                        return {...pocket, value: !isNaN(deducted) && !isNaN(summed) ? formatValue(summed): pocket.value};
                    } else {
                        return pocket
                    }
                }),
                to: {...state.to, value:''},
                from: {...state.from, value:''}
            };
        case UPDATE_RATES_REQUEST:
            //note we could set something on the state here to show we are awaiting the response
            return {...state};
        case UPDATE_RATES_SUCCESS:
            const rate = calculateRate(state.from.currency, state.to.currency, action.rates);
            return {...state, rates: action.rates, rate};
        default:
            return state
    }
}


export function calculateRate(fromCurrency: Currency, toCurrency: Currency, rates: RatesMap): number {
    const toRate = rates[toCurrency];
    const fromRate = rates[fromCurrency];
    return toRate / fromRate;
}

export function calculateValue(value:string, rate:number): string{
    const newValue = parseFloat(value);
    return (isNaN(newValue) ? '': formatValue(newValue * rate));
}

export function formatValue(value: number) {
    const rounded = Math.floor(value *100) /100;
    return rounded.toFixed(2);
}
