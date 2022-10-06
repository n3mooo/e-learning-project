import { createSlice } from "@reduxjs/toolkit";
import { fetchCoursesOfTopicAction, fetchTopicsAction } from "./action";

const initialState = {
    topics: null,
    coursesOfTopic: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    extraReducers: {
        [fetchTopicsAction.fulfilled]: (state, action) => {
            state.topics = action.payload;
        },

        [fetchCoursesOfTopicAction.fulfilled]: (state, action) => {
            state.coursesOfTopic = action.payload;
        },
    },
});

export default homeSlice;
