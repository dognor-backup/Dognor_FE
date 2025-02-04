import { create } from "zustand";

const usePostStore = create((set) => ({
  postsData: [
    {
      postSeq: null,
      title: "",
      content: "",
      categoryCd: null,
      categoryName: "",
      hitCnt: 1,
      usageDate: "",
      firstSaveDt: "",
      firstSaveUser: "",
    },
  ],
  totalPage: null,
  setPostData: (post) => set({ postsData: post }),
}));
export default usePostStore;
