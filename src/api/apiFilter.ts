import axiosInstance from "./axiosInstance";

export const fetchFilterByType = async (type: any) => {
  try {
    const { data: response } = await axiosInstance.get("filters");
    const dataF = response.filter((filter: any) => filter.category === type);
    return dataF;
  } catch (error: any) {
    console.error(error.message);
  }
};
