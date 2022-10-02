import { createSlice } from "@reduxjs/toolkit";
import { signInAction, signUpAction } from "./action";

const initialState = {
    profile: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        clear(state, action) {
            state.loading = false;
            state.error = null;
        },
        logOut(state, action) {
            state.profile = action.payload;
        },
    },

    extraReducers: {
        //signInAction
        [signInAction.pending]: (state, action) => {
            state.loading = true;
        },
        [signInAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.profile = action.payload;
        },
        [signInAction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //signUpAction
        [signUpAction.pending]: (state, action) => {
            state.loading = true;
        },
        [signUpAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        [signUpAction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default authSlice;
