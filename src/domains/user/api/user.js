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

export const checkUser = async (credentials) => {
  try {
    const response = await AxiosInstance.post("/user/check", credentials );
    if (response.data.data === true) {
      return { success: true, data: response.data };
    }
    if (response.data.data === false) {
      return {
        success: false,
        msg: response.data.msg || "아이디 또는 비밀번호가 틀렸습니다",
      };
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

export const updateUserInfo = async (userInfo) => {
  try {
    const response = await AxiosInstance.put("/user/info", userInfo);
    if (response.data.code === 200) {
      return { 
        success: true, 
        data: response.data.data,
        msg: "회원정보가 성공적으로 수정되었습니다."
      };
    }
    return {
      success: false,
      msg: response.data.msg || "회원정보 수정에 실패했습니다."
    };
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        return { 
          success: false, 
          msg: "잘못된 요청입니다. 입력 정보를 확인해주세요."
        };
      } else if (status === 401) {
        return { 
          success: false, 
          msg: "인증되지 않은 요청입니다."
        };
      } else if (status === 500) {
        return { 
          success: false, 
          msg: "서버 오류가 발생했습니다."
        };
      }
    }
    return { 
      success: false, 
      msg: "네트워크 오류. 연결 상태를 확인해주세요."
    };
  }
};
