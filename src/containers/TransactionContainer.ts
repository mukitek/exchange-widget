import {connect} from "react-redux";
import {Transaction, TransactionDispatchProps, TransactionStateProps} from "../components/Transaction";
import {AppState} from "../Model/AppState";
import {PocketPosition} from "../Model/PocketPosition";
import {updateCurrency, updateValue} from "../redux/actions";
import {Currency} from "../Model/Currency";

const mapStateToProps = (state: AppState): TransactionStateProps =>{
  const getToBalance = state.pockets.find(p=> state.to.currency===p.currency);
  const toBalance = getToBalance? getToBalance.value : '0';
  const getFromBalance = state.pockets.find(p=> state.from.currency===p.currency);
  const fromBalance = getFromBalance? getFromBalance.value : '0';
  return{
    to: { ...state.to, balance: toBalance },
    from: { ...state.from, balance: fromBalance }
  }
};


const mapDispatchToProps = (dispatch: any): TransactionDispatchProps =>({
  handleCurrencyChange: (currency:Currency, position: PocketPosition) => {
    dispatch(updateCurrency(currency, position));
  },
  handleValueChange: (value:string, position: PocketPosition) => {
    dispatch(updateValue(value, position));
  }
});

export const TransactionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Transaction);
