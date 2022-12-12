import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../../types/users"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const login = 
    (
        username: string,
        password: string,
        navigate: NavigateFunction
    ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            })
            await axiosInstance
                .post('/token/', {
                    username: username,
                    password: password
                })
                .then((res) => {
                    localStorage.setItem('access_token',res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] =
                        'Bearer ' + localStorage.getItem('access_token');

                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: {
                            loading: true,
                            username: username,
                            access: res.data.access,
                            refresh: res.data.refresh,
                        },
                    })
                })
            navigate('/')
        } catch (error) {
            dispatch({
                type: USER_LOGIN_ERROR,
                payload: {
                    error: error
                }
            })
        }
}