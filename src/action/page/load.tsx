import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction } from "react-router-dom"
import { PAGE_SUCCESS } from "../../types/page"

export const load = 
    (navigate: NavigateFunction): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
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

}