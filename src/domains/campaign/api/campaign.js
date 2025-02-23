import AxiosInstance from "@/shared/utils/axiosInstance";

export const getCampaigns = async (params) => {
  try {
    const response = await AxiosInstance.get("/campaign", { params });

    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
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
