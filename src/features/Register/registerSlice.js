import { createSlice } from "@reduxjs/toolkit";
import {
  cancelRegister,
  confirmRegister,
  fetchConfirmCourseList,
  fetchConfirmList,
  fetchRegisterCourseList,
  fetchRegisteredList,
  fetchUnregisterCourseList,
  fetchUnregisterList,
  register,
  userCancelRegister,
  userConfirmRegister,
  userRegister,
} from "./action";
const initialState = {
  registered: null,
  unRegistered: null,
  confirm: null,
  error: null,
  success: null,
  u_registered: null,
  u_unRegistered: null,
  u_confirm: null,
};
const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {
    reset: (state, action) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: {
    [fetchUnregisterList.fulfilled]: (state, action) => {
      state.unRegistered = action.payload;
    },
    [fetchRegisteredList.fulfilled]: (state, action) => {
      state.registered = action.payload;
    },
    [fetchConfirmList.fulfilled]: (state, action) => {
      state.confirm = action.payload;
    },
    [register.pending]: (state, action) => {
      state.success = null;
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
    },
    [register.rejected]: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    [cancelRegister.pending]: (state, action) => {
      state.success = null;
      state.error = null;
    },
    [cancelRegister.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
    },
    [cancelRegister.rejected]: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    [confirmRegister.pending]: (state, action) => {
      state.success = null;
      state.error = null;
    },
    [confirmRegister.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
    },
    [confirmRegister.rejected]: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    [fetchUnregisterCourseList.fulfilled]: (state, action) => {
      state.u_unRegistered = action.payload;
    },
    [fetchRegisterCourseList.fulfilled]: (state, action) => {
      state.u_registered = action.payload;
    },
    [fetchConfirmCourseList.fulfilled]: (state, action) => {
      state.u_confirm = action.payload;
    },
    [userRegister.pending]: (state, action) => {
      state.success = null;
      state.error = null;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
    },
    [userRegister.rejected]: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    [userCancelRegister.pending]: (state, action) => {
      state.success = null;
      state.error = null;
    },
    [userCancelRegister.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
    },
    [userCancelRegister.rejected]: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    [userConfirmRegister.pending]: (state, action) => {
      state.success = null;
      state.error = null;
    },
    [userConfirmRegister.fulfilled]: (state, action) => {
      state.success = true;
      state.error = null;
    },
    [userConfirmRegister.rejected]: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
  },
});
export default registerSlice;
