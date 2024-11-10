import { configureStore } from "@reduxjs/toolkit";
import tabBarReducer from "./tabBarSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    tabBar: tabBarReducer,
    auth: authReducer,
  },
});

export default store;
