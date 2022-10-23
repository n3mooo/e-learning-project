import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";
export const fetchCourseList = createAsyncThunk(
  "coursesManage/setCourseList",
  async (group) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
        method: "GET",
        params: {
          maNhom: group,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchCourseDetail = createAsyncThunk(
  "coursesManage/setCourseDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/LayThongTinKhoaHoc",
        method: "GET",
        params: {
          maKhoaHoc: id,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateCourse = createAsyncThunk(
  "coursesManage/updateCourse",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload",
        method: "POST",
        data: formData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const deleteCourse = createAsyncThunk(
  "coursesManage/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/XoaKhoaHoc",
        method: "DELETE",
        params: {
          MaKhoaHoc: id,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchCourseTypes = createAsyncThunk(
  "coursesManage/setCourseTypes",
  async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
        method: "GET",
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchCreatorAccount = createAsyncThunk(
  "coursesManage/setCreatorAccount",
  async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const addCourse = createAsyncThunk(
  "coursesManage/addCourse",
  async (formData, { rejectWithValue }) => {
  
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
        method: "POST",
        data: formData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const filterCourse = createAsyncThunk(
  "coursesManage/filterCourse",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc",
        method: "GET",
        params: {
          maDanhMuc: id,
          MaNhom:"GP01",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
