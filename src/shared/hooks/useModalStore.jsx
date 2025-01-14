import { create } from "zustand";

const useModalStore = create((set) => ({
  //state
  isModalOpen: false,
  //action
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
export default useModalStore;
