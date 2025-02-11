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

export const deletePost = async (postId) => {
  try {
    const response = await AxiosInstance.delete(`/community/posts/${postId}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteSelectedPosts = async (data) => {
  try {
    const response = await AxiosInstance.post(`/community/posts/delete`, data);
    if (response.data.code === 200) {
      console.log(response.data);
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

export const searchComments = async (data) => {
  const { postSeq, page, size } = data;
  const response = await AxiosInstance.get(`/community/comments/${postSeq}/${page}/${size}`);
  return { success: true, data: response.data };
};

export const viewCount = async (postSeq) => {
  const response = await AxiosInstance.patch(`/community/post/hit-cnt/${postSeq}`);
  console.log("조회수 증가:", response.data);
  return { success: true, data: response.data };
};
