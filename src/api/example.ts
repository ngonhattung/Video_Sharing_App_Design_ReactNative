import axiosInstance from "./axiosInstance";

export const exampleGet = async () => {
  try {
    const { data: response } = await axiosInstance.get("posts");
    return response;
  } catch (error: any) {
    console.error(error.message);
  }
};
