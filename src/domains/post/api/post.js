import AxiosInstance from "@/shared/utils/axiosInstance";

export const post = async (data) => {
  try {
    const response = await AxiosInstance.post("/community/post", data);

    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const postEdit = async (data) => {
  try {
    const response = await AxiosInstance.put("/community/post", data);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const postSearch = async (data) => {
  try {
    const response = await AxiosInstance.post("/community/posts/search", data);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};

//포스트 단건 삭제
export const deletePost = async (postId) => {
  try {
    const response = await AxiosInstance.delete(`/community/post/${postId}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};

//포스트 일괄 삭제
export const deleteSelectedPosts = async (data) => {
  try {
    const response = await AxiosInstance.post(`/community/posts/delete`, data);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (data) => {
  const response = await AxiosInstance.post(`/community/comment`, data);
  if (response.data.code === 200) {
    return { success: true, data: response.data };
  }
};

export const deleteComment = async (commentSeq) => {
  try {
    const response = await AxiosInstance.delete(`/community/comment/${commentSeq}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchComments = async (data) => {
  const { postSeq, page, size } = data;
  const response = await AxiosInstance.get(`/community/comments/${postSeq}/${page}/${size}`);
  return { success: true, data: response.data };
};

export const viewCount = async (postSeq) => {
  const response = await AxiosInstance.patch(`/community/post/hit-cnt/${postSeq}`);
  return { success: true, data: response.data };
};

export const editComment = async (data) => {
  const response = await AxiosInstance.put(`/community/comment`, data);
  if (response.data.code === 200) {
    return { success: true, data: response.data };
  }
};
