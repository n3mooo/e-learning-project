import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/authentication/authSlice";
import homeSlice from "features/home/homeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
    },
});

export default store;
