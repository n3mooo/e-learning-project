
import instance from "api/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUnregisterList = createAsyncThunk(
  "register/setUnregister",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh",
        method: "POST",
        data: {
          maKhoaHoc: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchRegisteredList = createAsyncThunk(
  "register/setRegistered",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchConfirmList = createAsyncThunk(
  "register/setConfirm",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
        method: "POST",
        data: {
          maKhoaHoc: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const register = createAsyncThunk(
  "register/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/DangKyKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: data.id,
          taiKhoan: data.taiKhoan,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const cancelRegister = createAsyncThunk(
  "register/cancelRegister",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/HuyGhiDanh",
        method: "POST",
        data: {
          maKhoaHoc: data.id,
          taiKhoan: data.taiKhoan,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const confirmRegister = createAsyncThunk(
  "register/confirmRegister",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: data.id,
          taiKhoan: data.taiKhoan,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchUnregisterCourseList = createAsyncThunk(
  "register/setUnregisterCourseList",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh",
        method: "POST",
        data: {
          TaiKhoan: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchRegisterCourseList = createAsyncThunk(
  "register/setRegisterCourseList",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        method: "POST",
        data: {
          TaiKhoan: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchConfirmCourseList = createAsyncThunk(
  "register/setConfirmCourseList",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        method: "POST",
        data: {
          TaiKhoan: id,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const userRegister = createAsyncThunk(
  "register/userRegister",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/DangKyKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: data.maKhoaHoc,
          taiKhoan: data.taiKhoan,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const userCancelRegister = createAsyncThunk(
  "register/userCancelRegister",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/HuyGhiDanh",
        method: "POST",
        data: {
          maKhoaHoc: data.maKhoaHoc,
          taiKhoan: data.taiKhoan,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const userConfirmRegister = createAsyncThunk(
  "register/userConfirmRegister",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: data.maKhoaHoc,
          taiKhoan: data.taiKhoan,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);