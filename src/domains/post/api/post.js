import AxiosInstance from "@/shared/utils/axiosInstance";

export const post = async (data) => {
  try {
    const response = await AxiosInstance.post("/community/post", data);

    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const postSearch = async (data) => {
  try {
    const response = await AxiosInstance.post("/community/posts/search", data);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};
