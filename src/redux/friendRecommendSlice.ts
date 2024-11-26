import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiUser from "../api/apiUser";
import { FriendRecommendType } from "../types/interfaces";
const friendRecommendSlice = createSlice({
  name: "friendRecommendList",
  initialState: {
    friendRecommend: [] as FriendRecommendType[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendRecommend.fulfilled, (state, action) => {
        state.friendRecommend = action.payload;
      })
      .addCase(removeFriendRecommend.fulfilled, (state, action) => {
        state.friendRecommend = state.friendRecommend.filter(
          (friend) => friend.userId !== action.payload
        );
      });
  },
});

export const fetchFriendRecommend = createAsyncThunk(
  "recommendList/fetchFriendRecommend",
  async () => {
    const result = await apiUser.getFriendsOfMyFriends();
    return result;
  }
);
export const removeFriendRecommend = createAsyncThunk(
  "recommendList/removeFriendRecommend",
  async (userId: string) => {
    await apiUser.handleSaveFowllow(userId);
    return userId;
  }
);

export default friendRecommendSlice.reducer;
