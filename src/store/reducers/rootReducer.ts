import { combineReducers } from "redux";
import { store } from "../index";
import { pageReducer } from "./pageReducer";
import { userReducer } from "./userReducer";




export const rootReducer = combineReducers({
    user: userReducer,
    pages: pageReducer
})

export type RootState = ReturnType<typeof store.getState>