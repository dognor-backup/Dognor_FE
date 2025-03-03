import { create } from "zustand";

const useModalStore = create((set) => ({
  //state
  isModalOpen: false,
  modalname: null,
  //action
  openModal: (name) => set({ isModalOpen: true, modalname: name }),
  closeModal: (onClose) => {
    if (onClose) onClose();
    set({ isModalOpen: false, modalname: null });
  },
}));
export default useModalStore;
