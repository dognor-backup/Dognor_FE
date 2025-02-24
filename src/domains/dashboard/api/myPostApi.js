import AxiosInstance from "@/shared/utils/axiosInstance";

export const searchMyPost = async (params) => {
  try {
    const requestData = {
      postsSearchParam: {
        page: params.page || 1,
        size: params.size || 15,
        sortByHitCnt: params.sortByHitCnt ?? false,
        sortByLatest: params.sortByLatest ?? true,
        categoryCd: params.categoryCd || 0,
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

export const deleteMyPosts = async (selectedPosts) => {
  try {
    const response = await AxiosInstance.post(
      "/dashboard/delete-community",
      selectedPosts
    );

    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패:", error.response?.data || error.message);
    throw error;
  }
};

export const searchMyCommentReview = async (params) => {
  try {
    const requestData = {
      commentReviewSearchParam: {
        page: params.page || 1,
        size: params.size || 15,
        commentReviewType: params.commentReviewType || "all"
      },
    };

    const response = await AxiosInstance.post(
      "/dashboard/search-comment-review",
      requestData
    );

    return response.data;
  } catch (error) {
    console.error(
      "댓글/리뷰 검색 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
};