import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean
};

const initialState: ModalState = {
    isOpen: false
};

const createJoinModalSlice = createSlice({
    name: 'JoinClassModal',
    initialState,
    reducers: {
        setJoinClassModalOpen(state) {
            state.isOpen = true
        },
        setJoinClassModalClose(state) {
            state.isOpen = false
        }
    }
});

export const { setJoinClassModalOpen, setJoinClassModalClose } = createJoinModalSlice.actions;

export default createJoinModalSlice.reducer;