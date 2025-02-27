import AxiosInstance, { AxiosFormDataInstance } from "../../../shared/utils/axiosInstance";

export const savePatInfo = async (info) => {
  try {
    const formData = new FormData();
    
    formData.append("userSeq", info.userSeq);
    formData.append("name", info.name);
    formData.append("birthday", info.birthday);
    
    if (info.weight) {
      formData.append("weight", parseInt(info.weight, 10) || 0);
    }
    
    if (info.breedCd) {
      formData.append("breedCd", parseInt(info.breedCd, 10));
    }
    
    if (info.bloodTypeCd) {
      formData.append("bloodTypeCd", parseInt(info.bloodTypeCd, 10));
    }
    
    if (info.isDonor !== undefined) {
      formData.append("isDonor", parseInt(info.isDonor, 10));
    }
    
    if (info.imgFile instanceof File) {
      formData.append("imgFile", info.imgFile);
    } else {
      return {
        success: false,
        msg: "유효하지 않은 이미지 파일입니다."
      };
    }

    const response = await AxiosFormDataInstance.post("/pat/info", formData, {
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
    return handleAxiosError(error);
  }
};

export const getPatInfo = async (userSeq, page, size) => {
  try {
    const response = await AxiosInstance.get(
      `/pat/info/${userSeq}/${page}/${size}`
    );
    return { 
      success: true, 
      data: response.data.data, 
      totalPage: response.data.totalPage 
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deletePatInfo = async (patSeq) => {
  try {
    const response = await AxiosInstance.delete(`/pat/info/${patSeq}`);
    
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    
    return {
      success: false,
      msg: response.data.msg || "삭제에 실패했습니다."
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updatePatInfo = async (info) => {
  try {
    const formData = new FormData();
    
    formData.append("userSeq", info.userSeq);
    formData.append("patSeq", info.patSeq);
    formData.append("name", info.name);
    formData.append("birthday", info.birthday);
    
    if (info.weight) {
      formData.append("weight", parseInt(info.weight, 10) || 0);
    }
    
    if (info.breedCd) {
      formData.append("breedCd", parseInt(info.breedCd, 10));
    }
    
    if (info.bloodTypeCd) {
      formData.append("bloodTypeCd", parseInt(info.bloodTypeCd, 10));
    }
    
    if (info.isDonor !== undefined) {
      formData.append("isDonor", parseInt(info.isDonor, 10));
    }
    
    if (info.imgFile instanceof File) {
      formData.append("imgFile", info.imgFile);
    }

    const response = await AxiosFormDataInstance.put("/pat/info", formData, {
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
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error) => {
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
};

