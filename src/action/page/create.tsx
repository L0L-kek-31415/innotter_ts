import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { RootState } from "../../store/reducers/rootReducer"
import axiosInstance from "../../axios"
import { NavigateFunction } from "react-router-dom"
import { PAGE_SUCCESS } from "../../types/page"

export const create = 
    (
        values: any,
        navigate: NavigateFunction
    ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
        const response = await axiosInstance.post(
            '/api/v1/page/', values).catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  try{
                    alert(error.response.data.uuid)
                  }
                  catch (error){

                  }
                }
                else{
                    navigate('/')
                }
            })

            }

