import { create } from "zustand";

interface ModalData {
    name: string;
    description: string;
}

interface States {
    modalData: ModalData;
    isOpen: boolean;
}

interface StoreState extends States {
    setModalData: (data: ModalData) => void;
    setModalOpen: () => void;
    setModalClose: () => void;
}

const initialStates: States = {
    modalData: {
        name: "",
        description: ""
    },
    isOpen: false
};

// store - states and actions
const useStore = create<StoreState>()((set) => ({
    ...initialStates,
    setModalData: (data: ModalData) => set(() => ({ modalData: data })),
    setModalOpen: () => set(() => ({ isOpen: true })),
    setModalClose: () => set(() => ({ isOpen: false }))
}));

export default useStore;