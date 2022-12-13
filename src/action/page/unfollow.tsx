import axiosInstance from "../../axios";

export function stop_follow(uuid: number) {
  axiosInstance.post(`/api/v1/page/${uuid}/unfollow/`);
}
