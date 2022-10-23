import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const subscribeCourseAction = createAsyncThunk(
    "cart/subscribeCourse",
    async (data, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyKhoaHoc/DangKyKhoaHoc",
                method: "POST",
                data: data,
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const unsubscribeCourseAction = createAsyncThunk(
    "cart/unsubscribeCourse",
    async (data, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyKhoaHoc/HuyGhiDanh",
                method: "POST",
                data: data,
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
