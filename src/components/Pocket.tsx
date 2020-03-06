import React from 'react';
import {IMoney} from "../Model/IMoney";
import {PocketPosition} from "../Model/PocketPosition";
import {Currency} from "../Model/Currency";
import {symbols} from "../Model/currencySymbols";

export type PocketProps = IMoney & {
    position: PocketPosition,
    handleCurrencyChange: Function,
    handleValueChange: Function,
    balance: string
};

export class Pocket extends React.PureComponent<PocketProps> {
    render() {
        const {currency, value, balance, position} = this.props;
        const currencyOptions = Object.values(Currency).map((v: string, index: number) => (
            <option key={index} value={v}>{v}</option>));
        return (
            <div className={'pocket'}>
                <div className={'row row1 columns'}>
                    <div className={'currency col-2'}>
                        <select value={currency} onChange={this.handleCurrencyChange}>{currencyOptions}
                        </select>
                    </div>
                    <div className={'money col-10'}>
                        {position === PocketPosition.FROM ? '-' : '+'}
                        <input type="number" value={value} onChange={this.handleValueChange} />
                    </div>
                </div>
                <div className={'row row2 columns'}>
                    <div className={'balance col-6'}>Balance: {symbols[currency]}{balance}
                    </div>
                </div>
            </div>
        )
    }

    handleCurrencyChange = (event: React.FormEvent<HTMLSelectElement>) =>{
        const {handleCurrencyChange, position} = this.props;
        handleCurrencyChange(event.currentTarget.value, position);
    };

    handleValueChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {handleValueChange, position} = this.props;
        const pattern = /^\d*(\.\d{0,2})?$/;
        const result = pattern.test(event.currentTarget.value);
        if(result){
            handleValueChange(event.currentTarget.value, position)
        }
    };
}
