import AxiosInstance from "../../../shared/utils/axiosInstance";

//아이디 중복 확인
export const checkDuplicate = async (userIdValue) => {
  try {
    const response = await AxiosInstance.post(
      "/user/check-duplicate",
      userIdValue
    );
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return {
        success: false,
        msg: response.data.msg || "아이디 중복 조회 실패",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

//이메일 인증
export const checkUserEmail = async (userEmail) => {
  try {
    const response = await AxiosInstance.post("/user/email-verify", userEmail);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return {
        success: false,
        msg: response.data.msg || "이메일 인증 코드발송 실패",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

//회원가입 요청
export const registerUser = async (userRegistInfo) => {
  try {
    const response = await AxiosInstance.post("/regist", userRegistInfo);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return {
        success: false,
        msg: response.data.msg || "회원가입 요청 실패",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
