import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coursesSlice from "features/Courses/coursesSlice";
import userSlice from "features/LogIn/userSlice";
import userManageSlice from "features/User/userManageSlice";
import registerSlice from "features/Register/registerSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  user: userSlice.reducer,
  userManager: userManageSlice.reducer,
  courses: coursesSlice.reducer,
  register: registerSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
    reducer: persistedReducer,
});
export default store;
