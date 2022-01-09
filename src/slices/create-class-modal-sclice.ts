import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean
};

const initialState: ModalState = {
    isOpen: false
};

const createClassModalSlice = createSlice({
    name: 'CreateClassModal',
    initialState,
    reducers: {
        setCreateClassModalOpen(state) {
            state.isOpen = true
        },
        setCreateClassModalClose(state) {
            state.isOpen = false
        }
    }
});

export const { setCreateClassModalOpen, setCreateClassModalClose } = createClassModalSlice.actions;

export default createClassModalSlice.reducer;