import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabBarState {
  hideTabBar: boolean;
}
const initialState: TabBarState = {
  hideTabBar: false,
};

const tabBarSlice = createSlice({
  name: "tabBar",
  initialState,
  reducers: {
    setHideTabBar(state, action: PayloadAction<boolean>) {
      state.hideTabBar = action.payload;
    },
  },
});

export const { setHideTabBar } = tabBarSlice.actions;
export default tabBarSlice.reducer;
