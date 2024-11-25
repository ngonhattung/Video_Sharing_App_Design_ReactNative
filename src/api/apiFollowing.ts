import axiosInstance from "./axiosInstance";

export const getFollowing = async () => {
    try {
        const { data: response } = await axiosInstance.get("following");
        return response;
    } catch (error: any) {
        console.error(error.message);
    }
}

export const getFollower = async () => {
    try {
        const { data: response } = await axiosInstance.get("followers");
        return response;
    } catch (error: any) {
        console.error(error.message);
    }
}

export const updateFollowing = async (id: number, status: string) => {
    try {
        const { data: response } = await axiosInstance.put(`following/${id}`, { status });
        return response;
    } catch (error: any) {
        console.error(error.message);
    }
}