import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {appReducer} from "../redux/reducers";

export type RootState = ReturnType<typeof appReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >
