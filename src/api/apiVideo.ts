import axiosInstance from "./axiosInstance";

export const getVideo = async () => {
    try {
        const { data: response } = await axiosInstance.get("videos");
        return response;
    } catch (error: any) {
        console.error(error.message);
    }
}

