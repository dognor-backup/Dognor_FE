import AxiosInstance from "@/shared/utils/axiosInstance";

/**
 * 커뮤니티 게시글 목록을 검색하는 API 요청
 * @param {Object} params - 검색 필터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.size - 페이지당 개수
 * @param {boolean} params.sortByHitCnt - 조회수 기준 정렬 여부
 * @param {boolean} params.sortByLatest - 최신순 정렬 여부
 * @param {boolean} params.myPostsOnly - 내 게시글만 조회 여부
 * @param {number} params.categoryCd - 카테고리 코드
 */
export const searchCommunityPosts = async (params) => {
  try {
    const requestBody = {
      searchParam: {
        page: params.page || 1,
        size: params.size || 15,
        sortByHitCnt: params.sortByHitCnt || false,
        sortByLatest: params.sortByLatest || true,
        myPostsOnly: params.myPostsOnly || false,
        categoryCd: params.categoryCd || null,
      },
    };

    const response = await AxiosInstance.post(
      "/community/posts/search",
      requestBody
    );

    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
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
