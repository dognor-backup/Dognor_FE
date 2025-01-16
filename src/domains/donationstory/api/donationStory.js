import AxiosInstance from "@/shared/utils/axiosInstance";

export const searchDonationStories = async () => {
  try {
    const response = await AxiosInstance.post("/donation-stories/search");

    if (response.data.code === 200) {
      return { data: response.data };
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        return {
          success: false,
          msg: data.msg || "Bad Request: 잘못된 요청입니다.",
        };
      } else if (status === 500) {
        return { success: false, msg: "서버 오류가 발생했습니다." };
      }
    }
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};
