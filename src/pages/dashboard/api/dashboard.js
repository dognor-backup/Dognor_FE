import AxiosInstance from "@/shared/utils/axiosInstance";

export const getBannerList = async () => {
  try {
    const response = await AxiosInstance.post("/dashboard/banner");
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};
