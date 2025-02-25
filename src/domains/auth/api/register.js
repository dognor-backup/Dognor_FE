import AxiosInstance from "../../../shared/utils/axiosInstance";

const apiRequest = async (url, payload, defaultErrorMessage) => {
  try {
    const response = await AxiosInstance.post(url, payload);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    return {
      success: false,
      msg: response.data.msg || defaultErrorMessage,
    };
  } catch (error) {
    return {
      success: false,
      msg: "서버와의 통신 중 오류가 발생했습니다.",
    };
  }
};

export const checkDuplicate = (userIdValue) =>
  apiRequest("/user/check-duplicate", userIdValue, "아이디 중복 조회 실패");
export const checkUserEmail = (userEmail) => apiRequest("/user/email-verify", userEmail, "이메일 인증 코드 발송 실패");
export const registerUser = (userRegistInfo) => apiRequest("/regist", userRegistInfo, "회원가입 요청 실패");