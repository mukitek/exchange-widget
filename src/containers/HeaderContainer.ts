import {connect} from "react-redux";
import {Header} from "../components/Header";
import {AppState} from "../Model/AppState";
import {exchangeMoney} from "../redux/actions";

const mapStateToProps = (state: AppState) =>({
    to: state.to,
    from: state.from,
    rate: state.rate
});


const mapDispatchToProps = (dispatch: any) => ({
    handleExchange: () =>{
        dispatch(exchangeMoney());
    }
});

export const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
