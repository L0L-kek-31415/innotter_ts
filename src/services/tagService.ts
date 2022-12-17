import axios from "axios";
import axiosInstance from "../axios";

class PageService {
  getTags = () => {
    return axiosInstance.get("/api/v1/tag/");
  };
  createTag = (name: string) => {
    return axiosInstance.post("/api/v1/tag/", {
      name,
    });
  };
}

export default new PageService();
