import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction } from "react-router-dom"


export const register = 
    (
        register_info: string,
        navigate: NavigateFunction,
    ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        try {
            await axiosInstance
                .post('/api/v1/register/', register_info)
            navigate('/login')
        } catch (error) {
            
        }
}