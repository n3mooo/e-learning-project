import instance from "api/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInAction = createAsyncThunk(
    "auth/setProfile",
    async (values, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyNguoiDung/DangNhap",
                method: "POST",
                data: values.user,
            });

            const profile = { ...res.data };
            delete profile.accessToken;

            localStorage.setItem("token", res.data.accessToken);

            values.history.push("/home");

            return profile;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signUpAction = createAsyncThunk("auth/signUp", async (values, { rejectWithValue }) => {
    try {
        await instance.request({
            url: "api/QuanLyNguoiDung/DangKy",
            method: "POST",
            data: values.user,
        });

        values.history.push("/signin");
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchProfileAction = createAsyncThunk("auth/setProfile", async () => {
    try {
        const res = await instance.request({
            url: "api/QuanLyNguoiDung/ThongTinTaiKhoan",
            method: "POST",
        });

        return res.data;
    } catch (error) {}
});
