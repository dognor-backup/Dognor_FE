import AxiosInstance from "@/shared/utils/axiosInstance";

export const fetchHospitalReviews = async (hospitalSeq, page = 1, size = 100) => {
  try {
    const response = await AxiosInstance.post("/hospital/search-reviews", {
      page,
      size,
      hospitalSeq
    });

    if (response.data.code === 200) {
      return {
        success: true,
        data: response.data.data,
        msg: response.data.msg
      };
    } else {
      return {
        success: false,
        data: [],
        msg: response.data.msg || "리뷰를 불러오지 못했습니다."
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      msg: "네트워크 오류. 연결 상태를 확인해주세요."
    };
  }
};