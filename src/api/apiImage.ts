import axiosInstance from "./axiosInstance";

export const getImage = async () => {
    try {
        const { data: response } = await axiosInstance.get("images");
        return response;
    } catch (error: any) {
        console.error(error.message);
    }
}