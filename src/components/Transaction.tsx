import React from 'react';
import {PocketProps, Pocket} from "./Pocket";
import {IMoneyWithBalance} from "../Model/IMoney";
import {PocketPosition} from '../Model/PocketPosition';

export type TransactionDispatchProps = {handleCurrencyChange:Function, handleValueChange: Function}
export type TransactionStateProps = {to:IMoneyWithBalance, from:IMoneyWithBalance, }
export type TransactionProps = TransactionDispatchProps & TransactionStateProps;

export class Transaction extends React.PureComponent<TransactionProps>{
    render(){
        const { to, from, handleValueChange, handleCurrencyChange} = this.props;
        const toProps: PocketProps = {...to, position:PocketPosition.TO, handleValueChange, handleCurrencyChange};
        const fromProps: PocketProps = {...from, position:PocketPosition.FROM, handleCurrencyChange, handleValueChange};
        return(
            <div className={'transaction'}>
                <Pocket {...fromProps}/>
                <Pocket {...toProps}/>
            </div>
        )
    }
}

