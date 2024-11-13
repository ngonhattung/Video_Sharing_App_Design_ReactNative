import axiosInstance from "./axiosInstance";

export const fetchAudioByType = async (type: any) => {
  try {
    const { data: response } = await axiosInstance.get("audios");
    const dataF = response.filter((audio: any) => audio.category === type);
    return dataF;
  } catch (error: any) {
    console.error(error.message);
  }
};
