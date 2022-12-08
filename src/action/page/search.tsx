import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../../types/users"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { PAGE_LOAD_ERROR, PAGE_REQUEST, PAGE_SUCCESS } from "../../types/page"
import { PageState } from "../../store/reducers/pageReducer"

export const search = 
    (
        uuid: string, 
        tags: string, 
        name: string,
        navigate: NavigateFunction
    ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        // try {
            // dispatch({
            //     type: PAGE_REQUEST
            // })
            let params: {[key:string]: string} = {}
            if (uuid){params["uuid"] = uuid}
            if (name){params["name"] = name}
            if (tags){params["tags"] = tags}
            console.log(params["uuid"])
            const response = await axiosInstance.get(
                '/api/v1/search/page/', {params})
            console.log(response.data)
            console.log(typeof(response.data))
            dispatch({
                type: PAGE_SUCCESS,
                payload: {
                    pages: response.data
                },
            })
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