import React from 'react';
import {Transaction, TransactionProps} from './Transaction';

import {shallow} from 'enzyme';
import {Currency} from "../Model/Currency";

it('should render without throwing an error', function () {
    const props: TransactionProps = {
        handleCurrencyChange: () => {
        },
        handleValueChange: () => {
        },
        to: {value: '', currency: Currency.EUR, balance: '0.00'},
        from: {value: '', currency: Currency.EUR, balance: '0.00'}
    };
    const wrap = shallow(<Transaction {...props}/>);
    expect(wrap.text()).toEqual('<Pocket /><Pocket />');
});
