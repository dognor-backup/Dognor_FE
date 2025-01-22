import AxiosInstance from "@/shared/utils/axiosInstance";

export const getUserInfo = async (userId) => {
  try {
    const response = await AxiosInstance.get(`/user/${userId}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 404) {
        return { success: false, msg: "유저 정보를 찾을 수 없습니다." };
      } else if (status === 500) {
        return { success: false, msg: "서버 오류가 발생했습니다." };
      }
    }
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};
