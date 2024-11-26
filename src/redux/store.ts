import { configureStore } from "@reduxjs/toolkit";
import tabBarReducer from "./tabBarSlice";
import authReducer from "./authSlice";
import FriendRecommendReducer from "./friendRecommendSlice";
const store = configureStore({
  reducer: {
    tabBar: tabBarReducer,
    auth: authReducer,
    friendRecommendList: FriendRecommendReducer,
  },
});

export default store;
