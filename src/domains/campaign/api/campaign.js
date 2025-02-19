import AxiosInstance from "@/shared/utils/axiosInstance";

export const getCampaigns = async (data) => {
  const { userSeq, page, size } = data;
  try {
    const response = await AxiosInstance.get(`/campaign/${userSeq}/${page}/${size}`);
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

export const deleteCampaign = async (data) => {
  try {
    const response = await AxiosInstance.delete(`/campaign/${data}`);
  } catch (error) {}
};

//캠페인 상세 조회
export const getCampaignDetail = async (data) => {
  try {
    const response = await AxiosInstance.get(`/campaign/${data}`);
  } catch (error) {}
};

export const likeCampaign = async (data) => {
  try {
    const response = await AxiosInstance.patch(`/campaign/like`, data);
  } catch (error) {}
};

export const saveCampaign = async (data) => {
  try {
    const response = await AxiosInstance.post(`/campaign`, data);
  } catch (error) {}
};

export const editCampaign = async (data) => {
  try {
    const response = await AxiosInstance.put(`/campaign`, data);
  } catch (error) {}
};
