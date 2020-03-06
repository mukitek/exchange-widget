import React from 'react';
import {ExchangeWidget, ExchangeWidgetProps} from './ExchangeWidget';
import {shallow} from 'enzyme';

const spyGetRates = jest.fn();

it('should call get rates when it mounts', function () {
    const props: ExchangeWidgetProps = {
        getRates: spyGetRates
    };
    shallow(<ExchangeWidget {...props}/>);
    expect(spyGetRates).toHaveBeenCalled();
});
