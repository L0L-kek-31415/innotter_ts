import axios from "axios";
import axiosInstance from "../axios";

class PageService {
  getPages = () => {
    return axiosInstance.get("/api/v1/page/");
  };
  createItem = (name: string, description: string, uuid: number, tags: any) => {
    return axiosInstance.post("/api/v1/page/", {
      name,
      description,
      uuid,
      tags,
    });
  };
  getMyPages = () => {
    return axiosInstance.get("/api/v1/page/mypages/");
  };
  follow = (id: number) => {
    return axiosInstance.post(`/api/v1/page/${id}/follow/`);
  };
  unfollow = (id: number) => {
    return axiosInstance.post(`/api/v1/page/${id}/unfollow/`);
  };
  deleteFollower = (id: number, page_id: number) => {
    return axiosInstance.post(`/api/v1/page/${page_id}/delete/`, {
      followers: [id],
    });
  };
  deny = (id: number, page_id: number) => {
    return axiosInstance.post(`/api/v1/page/${page_id}/request/deny/`, {
      follow_requests: [id],
    });
  };
  accept = (id: number, page_id: number) => {
    return axiosInstance.post(`/api/v1/page/${page_id}/request/accept/`, {
      follow_requests: [id],
    });
  };
  search = (params: any) => {
    return axiosInstance.get("/api/v1/search/page/", { params });
  };
  getPageId = (id: any) => {
    return axiosInstance.get(`/api/v1/page/${id}/`);
  };
  delete = (id: any) => {
    return axiosInstance.delete(`/api/v1/page/${id}/`);
  };
}

export default new PageService();
