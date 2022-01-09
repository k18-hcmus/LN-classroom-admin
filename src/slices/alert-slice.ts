import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type serverity = 'error' | 'info' | 'warning' | 'success'

interface AlertState {
    isOpen?: boolean,
    message: string,
    severity: serverity
};

const initialState: AlertState = {
    isOpen: false,
    message: "",
    severity: 'info'
};

const alertSlice = createSlice({
    name: 'Alert',
    initialState,
    reducers: {
        createAlert(state, action: PayloadAction<AlertState>) {
            state.isOpen = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        closeAlert(state) {
            state.isOpen = false
        }
    }
});

export const { createAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;