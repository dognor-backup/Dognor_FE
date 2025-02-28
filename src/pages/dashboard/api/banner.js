import AxiosInstance from "@/shared/utils/axiosInstance";

export const getBannerList = async () => {
  try {
    const response = await AxiosInstance.get("/dashboard/search/banners");
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

export const deleteBanner = async (bannerSeq) => {
  try {
    const response = await AxiosInstance.delete(`/dashboard/banner/${bannerSeq}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.log(error);
  }
};
