import { createSlice } from "@reduxjs/toolkit";
import { alertService } from "common/hooks/AlertService";
import { subscribeCourseAction, unsubscribeCourseAction } from "./action";

const options = {
    autoClose: true,
    keepAfterRouteChange: true,
};

const initialState = {
    cart: [],
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        updateCart(state, action) {
            const cloneCart = [...state.cart];
            const foundCourse = cloneCart.findIndex(
                (item) => item.maKhoaHoc === action.payload.maKhoaHoc
            );

            if (foundCourse !== -1) {
                cloneCart.splice(foundCourse, 1);
            } else {
                cloneCart.push(action.payload);
            }
            state.cart = cloneCart;
        },

        clearCart(state, action) {
            state.cart = [];
        },
    },
    extraReducers: {
        [subscribeCourseAction.pending]: (state, action) => {
            state.loading = true;
        },
        [subscribeCourseAction.fulfilled]: (state, action) => {
            state.loading = false;
            alertService.success(`Successful registration: ${action.meta.arg.maKhoaHoc}`, options);
        },
        [subscribeCourseAction.rejected]: (state, action) => {
            state.loading = false;
            alertService.error(`${action.meta.arg.maKhoaHoc} Registered`, options);
        },

        [unsubscribeCourseAction.pending]: (state, action) => {
            state.loading = true;
        },
        [unsubscribeCourseAction.fulfilled]: (state, action) => {
            state.loading = false;
        },
    },
});

export default cartSlice;
