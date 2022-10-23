import {createSlice} from "@reduxjs/toolkit"
import { fetchCourseDetail } from "features/Courses/action";
import { addUser, deleteUser, fetchUserList, fetchUserType, searchUsers, updateUser } from "./action";

const initialState = {
    userList: [],
    selectedUser:[],
    userType:[],
    error:null,
    success:null,
    loading:null,
}
const userManageSlice = createSlice({
    name:"userManage",
    initialState:initialState,
    reducers:{
        reset:(state, action) => {
            state.error=null;
            state.success=null;
        },
        setSelectedUser:(state, action) => {
            state.selectedUser = action.payload;
        }
    },
    extraReducers: {
        [fetchUserList.pending]:(state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [fetchUserList.fulfilled]:(state, action) => {
            state.userList = action.payload;
            state.loading= null;
        },
        [fetchUserType.pending]:(state, action) => {
            state.loading = true;
        },
        [fetchUserType.fulfilled]:(state, action) => {
            state.userType = action.payload;
            state.loading= null;
        },
        [addUser.pending]:(state, action) => {
            state.success = null;
            state.error = null;
        },
        [addUser.fulfilled]:(state, action) => {
            state.success = true;
            state.error = null;
        },
        [addUser.rejected]:(state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        [deleteUser.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [deleteUser.fulfilled]:(state, action) => {
            state.error = null;
            state.success = true;
        },
        [deleteUser.rejected]:(state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        [updateUser.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [updateUser.fulfilled]:(state, action) => {
            state.error = null;
            state.success = true;
        },
        [updateUser.rejected]:(state, action) => {
            state.error = action.payload
            state.success = null;
        },
        [searchUsers.pending]:(state, action) => {
            state.error = null;
            state.success = null;
        },
        [searchUsers.fulfilled]:(state, action) => {
            state.userList = action.payload
        },
        [searchUsers.rejected]:(state, action) => {
            state.error = action.payload
            state.success = null;
        },
    }
})
export default userManageSlice;