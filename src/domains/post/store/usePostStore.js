import { create } from "zustand";

const usePostStore = create((set) => ({
  postsData: [],
  totalPage: null,
  setPostData: (data) => set({ postsData: data }),
}));

export default usePostStore;
