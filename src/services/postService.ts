import axiosInstance from "../axios"


class PostService {
    getPosts = () => {
        return axiosInstance.get("/api/v1/post/")
    }
    getPostsForMe = () => {
        return axiosInstance.get("/api/v1/post/recommendations/")
    }
    getMyLikes = () => {
        return axiosInstance.get("/api/v1/post/mylikes/")
    }
    like = (id: number) => {
        return axiosInstance.post(`/api/v1/post/${id}/like/`)
    }
    unlike = (id: number) => {
        return axiosInstance.post(`/api/v1/post/${id}/unlike/`)
    }
    createPost = (params: any) => {
        return axiosInstance.post("/api/v1/post", params)
    }
}

export default new PostService();