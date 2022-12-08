import { USER_LOGOUT, USER_LOGOUT_ERROR } from "../../types/users"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction } from "react-router-dom"


export const logout = 
    (navigate: NavigateFunction): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        try {
            const refresh = localStorage.getItem("refresh_token");

            dispatch({
                type: USER_LOGOUT
            })
            await axiosInstance
                .post('/api/v1/logout/', {
                    refresh_token: refresh
                    });
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("access_token");
                dispatch({
                    type: USER_LOGOUT,
                    payload: {
                        username: null,
                    }
                })
                axiosInstance.defaults.headers['Authorization'] = null;
            navigate('/')
        } catch (error) {
            dispatch({
                type: USER_LOGOUT_ERROR,
                payload: {
                    error: error
                }
            })
        }
}