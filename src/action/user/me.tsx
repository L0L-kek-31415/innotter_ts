import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction } from "react-router-dom"
import { USER_LOGIN_SUCCESS } from "../../types/users"


export const me = 
    (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        try {
            const response = await axiosInstance
                .post('/api/v1/me/')
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        loading: true,
                        username: response.data.username,
                    },
                })
        } catch (error) {
            
        }
}