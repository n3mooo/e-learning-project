import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const fetchUserDetailAction = createAsyncThunk(
  "user/setUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: data,
      });
      const userProfile = { ...res.data };
      delete userProfile.accessToken;
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role",userProfile.maLoaiNguoiDung)
      return userProfile;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
