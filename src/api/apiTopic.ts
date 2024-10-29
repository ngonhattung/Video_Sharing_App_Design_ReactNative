import axiosInstance from "./axiosInstance";

export const getTopic = async () => {
  try {
    const { data: response } = await axiosInstance.get("topics");
    return response;
  } catch (error: any) {
    console.error(error.message);
  }
};
