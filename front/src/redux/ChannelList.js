import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "channelList",
  initialState: {
    channelList: [
      {
        channelId: 1,
        channelName: "ch1",
      },
    ],
  },
  reducers: {
    SET_CHANNELLIST: (state, action)=>{
      state.channelList = action.payload;
    },
  },
});

export const { SET_CHANNELLIST } = tokenSlice.actions;

export default tokenSlice.reducer;
