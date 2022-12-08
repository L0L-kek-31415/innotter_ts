import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../../types/users"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { PAGE_LOAD_ERROR, PAGE_REQUEST, PAGE_SUCCESS } from "../../types/page"
import { PageState } from "../../store/reducers/pageReducer"

export const load = 
    (navigate: NavigateFunction): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        // try {
            // dispatch({
            //     type: PAGE_REQUEST
            // })
            console.log("send one")
            const response = await axiosInstance.get('/api/v1/page/', {timeout: 2000})
            console.log(response.data)
            console.log(typeof(response.data))
            dispatch({
                type: PAGE_SUCCESS,
                payload: {
                    pages: response.data
                },
            })
            console.log("get Onw")
            navigate('/')
        // } catch (error) {
        //     dispatch({
        //         type: PAGE_LOAD_ERROR,
        //         payload: {
        //             error: error
        //         }
        //     })
        // }
}