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
};

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
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
