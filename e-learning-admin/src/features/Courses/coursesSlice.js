import { createSlice } from "@reduxjs/toolkit"
import { addCourse, deleteCourse, fetchCourseDetail, fetchCourseList, fetchCourseTypes, fetchCreatorAccount, filterCourse, updateCourse } from "./action"

const initialState = {
    coursesList: [],
    selectedCourse: null,
    error:null,
    success: null,
    courseTypes: null,
    creatorAccount: null,
    loading:null,
}
const coursesSlice = createSlice({
    name:"courses",
    initialState: initialState,
    reducers: {
        reset: (state, action) => {
            state.error = null;
            state.success = null;
            state.loading = null;
        }
    },
    extraReducers: {
        [fetchCourseList.pending]:(state, acttion) => {
            state.coursesList = null;
            state.selectedCourse = null;
            state.loading = true;
        },
        [fetchCourseList.fulfilled]:(state, acttion) => {
            state.coursesList = acttion.payload;
            state.loading= null;
        },
        [fetchCourseDetail.pending]:(state, acttion) => {
            state.selectedCourse = null;
        },
        [fetchCourseDetail.fulfilled]:(state, acttion) => {
            state.selectedCourse = acttion.payload;
        },
        [updateCourse.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [updateCourse.fulfilled]:(state, action) => {
            state.error = null;
            state.success = true;
        },
        [updateCourse.rejected]:(state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        [fetchCourseTypes.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [fetchCourseTypes.fulfilled]:(state, action) => {
            state.courseTypes = action.payload;
        },
        [fetchCreatorAccount.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [fetchCreatorAccount.fulfilled]:(state, action) => {
            state.creatorAccount = action.payload;
        },
        [fetchCreatorAccount.rejected]:(state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        [addCourse.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [addCourse.fulfilled]:(state, action) => {
            state.error = null;
            state.success = true;
        },
        [addCourse.rejected]:(state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        [deleteCourse.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [deleteCourse.fulfilled]:(state, action) => {
            state.error = null;
            state.success = true;
        },
        [deleteCourse.rejected]:(state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        [filterCourse.fulfilled]:(state, action) => {
            state.coursesList = action.payload;
        },

    }
})
export default coursesSlice