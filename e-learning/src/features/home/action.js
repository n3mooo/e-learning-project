import instance from "api/instance";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchTopicsAction = createAsyncThunk("home/setTopics", async () => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
            method: "GET",
        });

        return res.data;
    } catch (error) {}
});

export const fetchCoursesAction = createAsyncThunk("home/setCourses", async () => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
            method: "GET",
        });

        return res.data;
    } catch (error) {}
});

export const fetchCoursesOfTopicAction = createAsyncThunk(
    "home/setCoursesOfTopic",
    async (values) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc",
                method: "GET",
                params: {
                    maDanhMuc: values,
                },
            });

            return res.data;
        } catch (error) {}
    }
);

export const fetchCourseDetailAction = createAsyncThunk("home/setCourseDetail", async (id) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyKhoaHoc/LayThongTinKhoaHoc",
            method: "GET",
            params: {
                maKhoaHoc: id,
            },
        });

        return res.data;
    } catch (error) {}
});
