import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/reducers/rootReducer";
import axiosInstance from "../../axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

export const login =
  (
    username: string,
    password: string,
    navigate: NavigateFunction
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    await userService.login(username, password).then((res) => {
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
    });
    navigate("/");
  };
