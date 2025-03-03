import AxiosInstance from "@/shared/utils/axiosInstance";

export const fetchHospitalReviews = async (hospitalInfoSeq) => {
  try {
    const response = await AxiosInstance.get(
      `/hospital/reviews/${hospitalInfoSeq}`
    );

    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        msg: response.data.msg || "데이터를 불러오지 못했습니다.",
      };
    }
  } catch (error) {
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};

export const submitHospitalReview = async (reviewData) => {
  try {
    const response = await AxiosInstance.post("/hospital/review", reviewData);

    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        msg: response.data.msg || "리뷰 등록에 실패했습니다.",
      };
    }
  } catch (error) {
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};
