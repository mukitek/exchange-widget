import {appReducer, calculateValue, formatValue} from "./reducers";
import {initialExchangeWidgetState} from "./initialState";
import {PocketPosition} from "../Model/PocketPosition";
import {exchangeMoney, UPDATE_RATES_REQUEST, UPDATE_RATES_SUCCESS, updateCurrency, updateValue} from "./actions";
import {Currency} from "../Model/Currency";

//would probably have a lot more tests for edge cases etc here.
describe('reducer case UPDATE_VALUE', () => {
    test('should calculate the "from" value correctly', () => {
        const action = updateValue('1000', PocketPosition.TO);
        const result = appReducer({...initialExchangeWidgetState, rate: 0.78255}, action);
        expect(result.from).toEqual({value: '1277.87', currency: Currency.GBP});
        expect(result.to).toEqual({value: '1000', currency: Currency.USD});
    });
    test('should calculate the "to" value correctly', () => {
        const action = updateValue('1000', PocketPosition.FROM);
        const result = appReducer({...initialExchangeWidgetState, rate: 1.12345}, action);
        expect(result.from).toEqual({value: '1000', currency: Currency.GBP});
        expect(result.to).toEqual({value: '1123.45', currency: Currency.USD});
    });
    test('should calculate the "from" value as empty when "to" is set to empty', () => {
        const action = updateValue('', PocketPosition.TO);
        const result = appReducer({...initialExchangeWidgetState}, action);
        expect(result.from).toEqual({value: '', currency: Currency.GBP});
        expect(result.to).toEqual({value: '', currency: Currency.USD});
    });
    test('should calculate the "to" value as empty when "from" is set to empty', () => {
        const action = updateValue('', PocketPosition.FROM);
        const result = appReducer({...initialExchangeWidgetState}, action);
        expect(result.from).toEqual({value: '', currency: Currency.GBP});
        expect(result.to).toEqual({value: '', currency: Currency.USD});
    });
});
describe('reducer case UPDATE_CURRENCY', () => {
    test('should flip currencies if same currency for "from" currency', () => {
        const action = updateCurrency(Currency.USD, PocketPosition.FROM);
        const result = appReducer({...initialExchangeWidgetState}, action);
        expect(result.from).toEqual({value: '', currency: Currency.USD});
        expect(result.to).toEqual({value: '', currency: Currency.GBP});
    });
    test('should flip currencies if same currency for "to" currency', () => {
        const action = updateCurrency(Currency.GBP, PocketPosition.TO);
        const result = appReducer({...initialExchangeWidgetState}, action);
        expect(result.from).toEqual({value: '', currency: Currency.USD});
        expect(result.to).toEqual({value: '', currency: Currency.GBP});
    });
    test('should set "to" value when changing "from" currency', () => {
        const action = updateCurrency(Currency.GBP, PocketPosition.FROM);
        const result = appReducer({...initialExchangeWidgetState,
            from:{currency:Currency.EUR, value:'1000'},
            rates:{...initialExchangeWidgetState.rates, [Currency.GBP]:1/1.12345}
            }, action);
        expect(result.from).toEqual({value: '1000', currency: Currency.GBP});
        expect(result.to).toEqual({value: '1123.45', currency: Currency.USD});
    });
    test('should set "to" value when changing "to" currency', () => {
        const action = updateCurrency(Currency.GBP, PocketPosition.TO);
        const result = appReducer({...initialExchangeWidgetState,
            from:{currency:Currency.USD, value:'1000'},
            to:{currency:Currency.EUR, value:'6666'},
            rates:{...initialExchangeWidgetState.rates, [Currency.GBP]:0.7749}
        }, action);
        expect(result.from).toEqual({value: '1000', currency: Currency.USD});
        expect(result.to).toEqual({value: '774.90', currency: Currency.GBP});
    });
});

describe('reducer case EXCHANGE_MONEY', () => {
    test('update "to" and "from" currency pockets on exchange', () => {
        const action = exchangeMoney();
        const result = appReducer({...initialExchangeWidgetState,
            from:{currency:Currency.USD, value:'1000'},
            to:{currency:Currency.EUR, value:'1222'},
            pockets: [{ currency:Currency.EUR, value: '10000.00'},
                {currency:Currency.GBP, value: ''},
                {currency:Currency.USD, value: '9000.00'}
            ]
        }, action);
        const fromPocket = result.pockets.find(p => p.currency === result.from.currency);
        const toPocket = result.pockets.find(p => p.currency === result.to.currency);
        expect(fromPocket).toEqual({value: '8000.00', currency: Currency.USD});
        expect(toPocket).toEqual({value: '11222.00', currency: Currency.EUR});
    });
    test('should do nothing if  "to" is empty', () => {
        const action = exchangeMoney();
        const result = appReducer({...initialExchangeWidgetState,
            from:{currency:Currency.USD, value:'20.00'},
            to:{currency:Currency.EUR, value:''},
            pockets: [{ currency:Currency.EUR, value: '10000.00'},
                {currency:Currency.GBP, value: ''},
                {currency:Currency.USD, value: '9000.00'}
            ]
        }, action);
        const fromPocket = result.pockets.find(p => p.currency === result.from.currency);
        const toPocket = result.pockets.find(p => p.currency === result.to.currency);
        expect(fromPocket).toEqual({value: '9000.00', currency: Currency.USD});
        expect(toPocket).toEqual({value: '10000.00', currency: Currency.EUR});
    });
    test('should do nothing if  "from" is empty', () => {
        const action = exchangeMoney();
        const result = appReducer({...initialExchangeWidgetState,
            from:{currency:Currency.USD, value:''},
            to:{currency:Currency.EUR, value:'20.00'},
            pockets: [{ currency:Currency.EUR, value: '10000.00'},
                {currency:Currency.GBP, value: ''},
                {currency:Currency.USD, value: '9000.00'}
            ]
        }, action);
        const fromPocket = result.pockets.find(p => p.currency === result.from.currency);
        const toPocket = result.pockets.find(p => p.currency === result.to.currency);
        expect(fromPocket).toEqual({value: '9000.00', currency: Currency.USD});
        expect(toPocket).toEqual({value: '10000.00', currency: Currency.EUR});
    });
});

describe('reducer case UPDATE_RATES_REQUEST', () => {
    test('returns state unchanged', () => {
        const action = {type: UPDATE_RATES_REQUEST};
        const result = appReducer({...initialExchangeWidgetState}, action);
        expect(result).toEqual(initialExchangeWidgetState);
    });
});

describe('reducer case UPDATE_RATES_SUCCESS', () => {
    test('should update the rates with new data', () => {
        const rates = {[Currency.EUR]: 1.1111,[Currency.GBP]: 2.2222,[Currency.USD]: 3.3333};
        const action = {type: UPDATE_RATES_SUCCESS, rates};
        const result = appReducer({...initialExchangeWidgetState}, action);
        expect(result.rates).toEqual(rates);
    });
    test('should update the current rate', () => {
        const rates = {[Currency.EUR]: 1.1111,[Currency.GBP]: 2.2222,[Currency.USD]: 1};
        const action = {type: UPDATE_RATES_SUCCESS, rates};
        const result = appReducer({...initialExchangeWidgetState,
            to:{value:'', currency:Currency.GBP},
            from:{value:'', currency:Currency.USD}
        }, action);
        expect(result.rate).toEqual(rates[Currency.GBP]);
    });
    test('should update the current rate (to rate/ from rate)', () => {
        const rates = {[Currency.EUR]: 1.1111,[Currency.GBP]: 2.2222,[Currency.USD]: 1};
        const action = {type: UPDATE_RATES_SUCCESS, rates};
        const result = appReducer({...initialExchangeWidgetState,
            to:{value:'', currency:Currency.GBP},
            from:{value:'', currency:Currency.EUR}
        }, action);
        expect(result.rate).toEqual(rates[Currency.GBP]/rates[Currency.EUR]);
    });
});

describe('formatValue', () => {
    test('should round down to two decimal places and return string', () => {
        expect(formatValue(3.333333)).toEqual('3.33');
        expect(formatValue(3.5)).toEqual('3.50');
        expect(formatValue(3.554)).toEqual('3.55');
        expect(formatValue(3.556)).toEqual('3.55');
        expect(formatValue(3.559999)).toEqual('3.55');
        expect(formatValue(0.001999)).toEqual('0.00');
        expect(formatValue(0.009999)).toEqual('0.00');
    })
});

describe('calculateValue', () => {
    test('should calculate rate', () => {
        expect(calculateValue('3.33', 1)).toEqual('3.33');
        expect(calculateValue('3.33', 1.5)).toEqual('4.99');
    });
    test('should return empty for empty value', () => {
        expect(calculateValue('', 1)).toEqual('');
    });
});
