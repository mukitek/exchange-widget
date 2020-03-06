import React from 'react';
import {shallow} from 'enzyme';
import {Currency} from "../Model/Currency";
import {Header, HeaderProps} from "./Header";

const spyHandleExchange = jest.fn();

const props: HeaderProps = {
    handleExchange: spyHandleExchange,
    rate: 1.222,
    to: {
        value: '50.00',
        currency: Currency.USD
    }, from: {
        value: '60.00',
        currency: Currency.GBP
    },
};

afterEach(() => {
    spyHandleExchange.mockClear();
});

it('should render Cancel Button', function () {
    const wrap = shallow(<Header {...props}/>);
    expect(wrap.containsMatchingElement(<button>Cancel</button>)).toBeTruthy();
});

it('should render Exchange Button', function () {
    const wrap = shallow(<Header {...props}/>);
    expect(wrap.containsMatchingElement(<button>Exchange</button>)).toBeTruthy();
});

it('should render rate correctly', function () {
    const wrap = shallow(<Header {...props}/>);
    expect(wrap.containsMatchingElement(<div>£1 = $1.2220</div>)).toBeTruthy();
});

it('should call change handler when exchange button clicked', function () {
    const wrap = shallow(<Header {...props}/>);
    wrap.find('.exchange-button').simulate('click', {
        currentTarget: {value: Currency.USD}
    });
    expect(spyHandleExchange).toHaveBeenCalled();
});
