import {UPDATE_CURRENCY, updateCurrency} from "./actions";
import {Currency} from "../Model/Currency";
import {PocketPosition} from "../Model/PocketPosition";

describe('actions', () => {
    it('should create an action to update currency', () => {
        const position= PocketPosition.TO;
        const currency= Currency.USD;
        const expectedAction = {
            type: UPDATE_CURRENCY,
            currency,
            position
        };
        expect(updateCurrency(currency, position)).toEqual(expectedAction)
    })
});

//not going to include all these- type safety with typescript covers it.

