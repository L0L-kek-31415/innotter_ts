import axiosInstance from "../../axios";


export function start_follow(uuid: number){
    axiosInstance.post(`/api/v1/page/${uuid}/follow/`)
}