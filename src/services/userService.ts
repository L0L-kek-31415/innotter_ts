import axiosInstance from "../axios";

class UserService {
  me = () => {
    return axiosInstance.post("/api/v1/me/");
  };
  login = (username: string, password: string) => {
    return axiosInstance.post("/token/", {
      username: username,
      password: password,
    });
  };
  getUsers = () => {
    return axiosInstance.get("/api/v1/users/");
  };
  register = (x: any) => {
    return axiosInstance.post("/api/v1/register/", x);
  };
}

export default new UserService();
