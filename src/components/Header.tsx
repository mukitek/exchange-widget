import React from 'react';
import {IMoney} from "../Model/IMoney";
import {symbols} from "../Model/currencySymbols";

export type HeaderProps = {to: IMoney, from: IMoney, rate: number, handleExchange: Function};

export class Header extends React.PureComponent<HeaderProps> {
    render() {
        const {to, from, rate} = this.props;
        const toSymbol = symbols[to.currency];
        const fromSymbol = symbols[from.currency];
        console.log('to', to);
        console.log('from', from);
        console.log('rate', rate);
        return (
            <div className={'header'}>
                <button className={'cancel-button btn'}>Cancel</button>
                <div className={'rate'}>{fromSymbol}1 = {toSymbol}{rate.toFixed(4)}</div>
                <button className={'exchange-button btn'} onClick={this.handleExchange}>Exchange</button>
            </div>
        )
    }

    handleExchange = () => {
        this.props.handleExchange();
    }
}
