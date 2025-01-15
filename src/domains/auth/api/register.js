import AxiosInstance from "../../../shared/utils/axiosInstance";

export const checkDuplicate = async (userIdValue) => {
  console.log("dd", userIdValue);
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
