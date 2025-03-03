import { create } from "zustand";

const useAlertStore = create((set) => ({
  //state
  isAlertOpen: false,
  deleteType: null,
  deleteTargetSeq: null,
  //action
  openAlert: (type, seq) =>
    set({ isAlertOpen: true, deleteType: type, deleteTargetSeq: seq }),
  closeAlert: () =>
    set({ isAlertOpen: false, deleteType: null, deleteTargetSeq: null }),
}));
export default useAlertStore;
