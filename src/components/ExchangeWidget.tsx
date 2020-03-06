import React from 'react';
import {TransactionContainer} from "../containers/TransactionContainer";
import {HeaderContainer} from "../containers/HeaderContainer";

export type ExchangeWidgetProps= { getRates: Function }

export class ExchangeWidget extends React.PureComponent<ExchangeWidgetProps> {

    componentDidMount(): void {
        this.props.getRates();
        setInterval(this.props.getRates, 10000);
    }

    render() {
        return (
            <div className={'exchange-widget'}>
                <HeaderContainer/>
                <TransactionContainer/>
            </div>
        )
    }
}
