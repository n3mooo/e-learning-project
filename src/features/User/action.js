import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const fetchUserList = createAsyncThunk(
  "userManage/setUserList",
  async (userGroup) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
        params: {
          MaNhom: userGroup,
        },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchUserType = createAsyncThunk(
  "userManage/setUserType",
  async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
        method: "GET",
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const addUser = createAsyncThunk(
  "userManage/addUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: data,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "userManage/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
          TaiKhoan: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUserDetail = createAsyncThunk(
  "userManager/setUserDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url:"/api/QuanLyNguoiDung/ThongTinNguoiDung",
        method:"POST",
        data: id
      })
      return res.data;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);
export const updateUser = createAsyncThunk(
  "userManager/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url:"/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method:"PUT",
        data: data,
      })
      return res.data;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);
export const searchUsers = createAsyncThunk(
  "userManager/searchUsers",
  async (keyword, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url:"/api/QuanLyNguoiDung/TimKiemNguoiDung",
        method:"GET",
        params: {
          MaNhom:"GP01",
          tuKhoa:keyword,
        }
      })
      return res.data;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

