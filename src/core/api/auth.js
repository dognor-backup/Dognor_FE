import AxiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await AxiosInstance.post("/login", credentials);
    const { code, data, msg } = response.data || {};

    if (code === 200) return { success: true, data };
    if (code === 400) return { success: false, msg: msg || "로그인 실패" };

    return { success: false, msg: msg || "예상치 못한 에러 발생" };
  } catch (error) {
    const { response } = error;
    const { status, data } = response || {};
    if (status === 400) {
      return { success: false, msg: data?.msg || "잘못된 요청입니다." };
    } else if (status === 500) {
      return { success: false, msg: "서버 오류가 발생했습니다." };
    }
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};
