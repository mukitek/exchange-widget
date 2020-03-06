import React from 'react';
import {Pocket, PocketProps} from './Pocket';
import {shallow} from 'enzyme';
import {Currency} from "../Model/Currency";
import {PocketPosition} from "../Model/PocketPosition";

const spyHandleCurrencyChange = jest.fn();
const spyHandleValueChange = jest.fn();

const props: PocketProps = {
    handleCurrencyChange: spyHandleCurrencyChange,
    handleValueChange: spyHandleValueChange,
    value: '50.00',
    currency: Currency.GBP,
    balance: '100.00',
    position: PocketPosition.TO
};

afterEach(() =>{
    spyHandleValueChange.mockClear();
    spyHandleCurrencyChange.mockClear();
});

it('should render balance correctly', function () {
    const wrap = shallow(<Pocket {...props}/>);
    expect(wrap.containsMatchingElement(<div>Balance: £100.00</div>)).toBeTruthy();
});

it('should render value in input correctly', function () {
    const wrap = shallow(<Pocket {...props}/>);
    expect(wrap.containsMatchingElement(<input value={'50.00'}/>)).toBeTruthy();
});

it('should call change handler when value updated', function () {
    const wrap= shallow(<Pocket {...props}/>);
    wrap.find('input').simulate('change',{
        currentTarget: { value: '2' }
    });
    expect(spyHandleValueChange).toHaveBeenCalled();
});

it('should call change handler when currency updated', function () {
    const wrap= shallow(<Pocket {...props}/>);
    wrap.find('select').simulate('change',{
        currentTarget: { value: Currency.USD }
    });
    expect(spyHandleCurrencyChange).toHaveBeenCalled();
});
