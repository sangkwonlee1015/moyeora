import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: [
      {
        userId:null,
        userNick:null,
        userPhone:null
      }
  ],
  },
  reducers: {
    SET_USERINFO: (state, action)=>{
      state.userInfo = action.payload;
    },
  },
});

export const { SET_USERINFO } = tokenSlice.actions;

export default tokenSlice.reducer;
