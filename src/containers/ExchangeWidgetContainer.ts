import {connect} from "react-redux";
import {updateRatesRequest} from "../redux/actions";
import {ExchangeWidget} from "../components/ExchangeWidget";

const mapStateToProps = () =>({});

const mapDispatchToProps = (dispatch: any) => ({
    getRates: () =>{
        dispatch(updateRatesRequest());
    }
});

export const ExchangeWidgetContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeWidget);


