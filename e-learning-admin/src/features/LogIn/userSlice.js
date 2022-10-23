import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetailAction } from "./action";

const initialState = {
  profile: null,
  error: null,
  success: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clear(state, action) {
      state.error = null;
      state.success = null;
    },
    logOut(state, action) {
      state.error = null;
      state.profile = null;
      state.success = null;
    },
  },
  extraReducers: {
    [fetchUserDetailAction.pending]: (state, action) => {
      state.profile = null;
      state.error = null;
      state.success = null;
    },
    [fetchUserDetailAction.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.error = null;
      state.success = true;
    },
    [fetchUserDetailAction.rejected]: (state, action) => {
      state.error = action.payload;
      state.profile = null;
      state.success = null;
    },
  },
});
export default userSlice;
