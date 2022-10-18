import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/authentication/authSlice";
import cartSlice from "features/cart/cartSlice";
import homeSlice from "features/home/homeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
        cart: cartSlice.reducer,
    },
});

export default store;
