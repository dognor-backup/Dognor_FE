import AxiosInstance from "@/shared/utils/axiosInstance";

export const post = async (file) => {
  try {
    const response = await AxiosInstance.post("/file", file);

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
