import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/authentication/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;
