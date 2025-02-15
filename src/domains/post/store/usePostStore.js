import { data } from "react-router-dom";
import { create } from "zustand";

const usePostStore = create((set) => ({
  noticeData: [],
  postsData: [],
  setPostData: (data) => set({ postsData: data }),
  setNoticeData: (data) => set({ noticeData: data }),
}));

export default usePostStore;
