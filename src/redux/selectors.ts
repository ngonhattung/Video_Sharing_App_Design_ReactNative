import { createSelector } from "@reduxjs/toolkit";

export const boolHideTabBar = (state: any) => state.tabBar.hideTabBar;
export const friendRecommendSelector = (state: any) =>
  state.friendRecommendList.friendRecommend;
