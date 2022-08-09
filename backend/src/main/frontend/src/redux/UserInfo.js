import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "userInfo",
  initialState: {
    accessToken: null,
    userInfo: {
      userName: null,
      userNick: null,
      userPhone: null,
    },
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.accessToken = action.payload;
    },
    SET_USERINFO: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { SET_TOKEN, SET_USERINFO } = tokenSlice.actions;

export default tokenSlice.reducer;
