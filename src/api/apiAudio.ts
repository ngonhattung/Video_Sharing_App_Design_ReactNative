import axiosInstance from "./axiosInstance";

export const getAudio = async () => {
  try {
    const { data: response } = await axiosInstance.get("audios");
    return response;
  } catch (error: any) {
    console.error(error.message);
  }
};
