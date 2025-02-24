import { create } from "zustand";

const useAlertStore = create((set) => ({
  //state
  isAlertOpen: true,
  //action
  openAlert: () => set({ isAlertOpen: true }),
  closeAlert: () => set({ isAlertOpen: false }),
}));
export default useAlertStore;
