import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCourseDetailAction,
    fetchCoursesAction,
    fetchCoursesOfTopicAction,
    fetchTopicsAction,
} from "./action";

const initialState = {
    topics: null,
    courses: null,
    coursesOfTopic: null,
    courseDetail: null,
    cart: [],
};

const homeSlice = createSlice({
    name: "home",
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
            state.cart = action.payload;
        },
    },
    extraReducers: {
        [fetchTopicsAction.fulfilled]: (state, action) => {
            state.topics = action.payload;
        },

        [fetchCoursesAction.fulfilled]: (state, action) => {
            state.courses = action.payload;
        },

        [fetchCoursesOfTopicAction.pending]: (state, action) => {
            state.coursesOfTopic = null;
        },
        [fetchCoursesOfTopicAction.fulfilled]: (state, action) => {
            state.coursesOfTopic = action.payload;
        },

        [fetchCourseDetailAction.pending]: (state, action) => {
            state.courseDetail = null;
        },
        [fetchCourseDetailAction.fulfilled]: (state, action) => {
            state.courseDetail = action.payload;
        },
    },
});

export default homeSlice;
