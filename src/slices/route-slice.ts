import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import RouteList from "../app/routes";
interface RouteState {
    currentSelected: number | string,
    preLoginUrl: string
};

const initialState: RouteState = {
    currentSelected: -1,
    preLoginUrl: '/'
};

const selectRouteHandler: CaseReducer<WritableDraft<RouteState>, PayloadAction<string>> = (state, action) => {
    const selectedIndex = RouteList.findIndex((route) => route.name === action.payload)
    if (selectedIndex === -1) {
        state.currentSelected = action.payload
    } else {
        if (selectedIndex !== state.currentSelected) {
            state.currentSelected = selectedIndex;
        }
    }
};

const routeSlice = createSlice({
    name: 'Route',
    initialState,
    reducers: {
        selectRoute: selectRouteHandler,
    }
});

export const { selectRoute } = routeSlice.actions;

export default routeSlice.reducer;