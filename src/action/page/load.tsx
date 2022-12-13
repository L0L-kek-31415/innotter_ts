import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/reducers/rootReducer";
import axiosInstance from "../../axios";
import { NavigateFunction } from "react-router-dom";
import { PAGE_SUCCESS } from "../../types/page";

export const load =
  (
    navigate: NavigateFunction,
    what: string = "page"
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    var response;
    if (what === "page") {
      response = await axiosInstance.get("/api/v1/page/", { timeout: 2000 });
    } else {
      response = await axiosInstance.get("/api/v1/page/mypages/");
    }
    dispatch({
      type: PAGE_SUCCESS,
      payload: {
        pages: response.data,
      },
    });
  };
