import axios from "axios";

const baseURL = "http://0.0.0.0:8888";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (typeof error.response == "undefined") {
      alert("Server error");
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const RefreshToken = localStorage.getItem("refresh_token");
      if (RefreshToken) {
        return axiosInstance
          .post("/token/refresh/", { refresh: RefreshToken })
          .then((response) => {
            try{
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;
            return axiosInstance(originalRequest);
            }
            catch(err){
              localStorage.removeItem("refresh_token")
              window.location.href = "/login/";
              return Promise.reject(err);
            }
          })
          .catch((err) => {
            localStorage.removeItem("refresh_token")
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
