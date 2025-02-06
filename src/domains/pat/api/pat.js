import AxiosInstance, {
  AxiosFormDataInstance,
} from "../../../shared/utils/axiosInstance";

/**
 * 강아지 정보 저장 API 요청 함수
 * @param {Object} info - 저장할 강아지 정보
 * @returns {Promise<Object>} - 성공 또는 실패 메시지 반환
 */
export const savePatInfo = async (info) => {
  try {
    const formData = new FormData();
    formData.append("userSeq", info.userSeq);
    formData.append("name", info.name);
    formData.append("birthday", info.birthday);
    formData.append("weight", parseInt(info.weight, 10));
    formData.append("breedCd", parseInt(info.breedCd, 10));
    formData.append("bloodTypeCd", parseInt(info.bloodTypeCd, 10));
    formData.append("isDonor", parseInt(info.isDonor, 10));
    formData.append("imgFile", info.imgFile);

    const response = await AxiosFormDataInstance.post("/pat/info", formData);

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

/**
 * 강아지 정보 가져오기 API 요청 함수
 * @param {number} page - 조회할 페이지 번호
 * @returns {Promise<Object>} - 강아지 정보 데이터 또는 에러 메시지 반환
 */
export const getPatInfo = async (userSeq, page, size) => {
  try {
    const response = await AxiosInstance.get(
      `/pat/info/${userSeq}/${page}/${size}`
    );
    console.log(response.data, "📌 Fetched Patient Info");

    return { success: true, data: response.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Axios 에러 핸들링 함수
 * @param {Object} error - Axios 오류 객체
 * @returns {Object} - 에러 메시지 반환
 */
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
