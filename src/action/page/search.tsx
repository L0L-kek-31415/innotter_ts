import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/reducers/rootReducer";
import axiosInstance from "../../axios";
import { NavigateFunction } from "react-router-dom";
import { PAGE_SUCCESS } from "../../types/page";

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
    let params: { [key: string]: string } = {};
    if (uuid) {
      params["uuid"] = uuid;
    }
    if (name) {
      params["name"] = name;
    }
    if (tags) {
      params["tags"] = tags;
    }
    const response = await axiosInstance.get("/api/v1/search/page/", {
      params,
    });
    dispatch({
      type: PAGE_SUCCESS,
      payload: {
        pages: response.data,
      },
    });
    navigate("/");
  };
