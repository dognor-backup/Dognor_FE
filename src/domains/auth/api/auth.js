import AxiosInstance from "../../../shared/utils/axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await AxiosInstance.post("/login", credentials);

    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "로그인 실패" };
    }

    return {
      success: false,
      msg: response.data.msg || "예상치 못한 에러 발생",
    };
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

export const fetchUserData = async (token) => {
  const response = await AxiosInstance.get("")
}