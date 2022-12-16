import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/reducers/rootReducer";
import axiosInstance from "../../axios";
import { NavigateFunction } from "react-router-dom";
import pageService from "../../services/pageService";

export const search: any =
  (
    uuid: string,
    tags: any,
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
    // const response = await axiosInstance.get("/api/v1/search/page/", {
    pageService.search(params);
    navigate("/");
  };
