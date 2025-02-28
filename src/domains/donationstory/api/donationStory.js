import AxiosInstance, { AxiosFormDataInstance } from "@/shared/utils/axiosInstance";

export const searchDonationStories = async (searchParam) => {
  try {
    const response = await AxiosInstance.post(
      "/donation-stories/search",
      searchParam
    );

    if (response.data.code === 200) {
      return { 
        success: true, 
        data: response.data.data,
        totalPage: response.data.totalPage || 1 
      };
    }
    
    return { 
      success: false, 
      data: [], 
      totalPage: 1,
      msg: "데이터를 불러오는데 실패했습니다." 
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        return {
          success: false,
          data: [],
          totalPage: 1,
          msg: data.msg || "Bad Request: 잘못된 요청입니다.",
        };
      } else if (status === 500) {
        return { 
          success: false, 
          data: [], 
          totalPage: 1,
          msg: "서버 오류가 발생했습니다." 
        };
      }
    }
    return { 
      success: false, 
      data: [], 
      totalPage: 1,
      msg: "네트워크 오류. 연결 상태를 확인해주세요." 
    };
  }
};

export const likeDonationStory = async (data) => {
  try {
    const response = await AxiosInstance.patch("/donation-story/like", data);
    return { success: true, data: response.data };
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

export const saveDonationStory = async (data) => {
  try {
    const formData = new FormData();
    
    formData.append("userSeq", data.userSeq);
    formData.append("patSeq", data.patSeq);
    formData.append("content", data.content);
    
    if (data.imgFile instanceof File) {
      formData.append("imgFile", data.imgFile);
    } else {
      return {
        success: false,
        msg: "유효하지 않은 이미지 파일입니다."
      };
    }

    const response = await AxiosFormDataInstance.post("/donation-story", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 10000
    });

    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }

    return {
      success: false,
      msg: response.data.msg || "예상치 못한 에러 발생",
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return {
            success: false,
            msg: data.msg || "Bad Request: 잘못된 요청입니다.",
          };
        case 500:
          return { success: false, msg: "서버 오류가 발생했습니다." };
        default:
          return { success: false, msg: "예상치 못한 에러 발생" };
      }
    }
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};

export const getHonorDogs = async (page = 1, size = 10) => {
  try {
    const response = await AxiosInstance.get(
      `/donation-story/honor-dogs/${page}/${size}`
    );

    if (response.data.code === 200) {
      return { 
        success: true, 
        data: response.data.data,
        totalPage: response.data.totalPage || 1 
      };
    }
    
    return { 
      success: false, 
      data: [], 
      totalPage: 1,
      msg: "명예의 전당 강아지 목록을 불러오는데 실패했습니다." 
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        return {
          success: false,
          data: [],
          totalPage: 1,
          msg: data.msg || "Bad Request: 잘못된 요청입니다.",
        };
      } else if (status === 500) {
        return { 
          success: false, 
          data: [], 
          totalPage: 1,
          msg: "서버 오류가 발생했습니다." 
        };
      }
    }
    return { 
      success: false, 
      data: [], 
      totalPage: 1,
      msg: "네트워크 오류. 연결 상태를 확인해주세요." 
    };
  }
};