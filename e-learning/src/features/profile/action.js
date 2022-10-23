import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const editProfileAction = createAsyncThunk(
    "profile/updateProfile",
    async (data, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
                method: "PUT",
                data: data,
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
