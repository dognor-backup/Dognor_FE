import AxiosInstance from "@/shared/utils/axiosInstance";

export const searchMyPost = async (params) => {
  try {
    const requestData = {
      postsSearchParam: {
        page: params.page || 1,
        size: params.size || 10,
        sortByHitCnt: params.sortByHitCnt ?? false,
        sortByLatest: params.sortByLatest ?? true,
        categoryCd: params.categoryCd > 0 ? params.categoryCd : null,
        postType: params.postType || "all",
      },
    };

    const response = await AxiosInstance.post(
      "/dashboard/search-posts",
      requestData
    );

    return response.data;
  } catch (error) {
    console.error(
      "나의 게시글 검색 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
};
