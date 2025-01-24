import { create } from "zustand";

const useModalStore = create((set) => ({
  //state
  isModalOpen: false,
  modalName: null,
  //action
  openModal: (name) => set({ isModalOpen: true, modalName: name }),
  closeModal: (onClose) => {
    if (onClose) onClose(); 
    set({ isModalOpen: false, modalName: null });
  },
}));
export default useModalStore;
