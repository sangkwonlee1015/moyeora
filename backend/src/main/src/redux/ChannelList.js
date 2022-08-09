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
    stomp: null,
  },
  reducers: {
    SET_STOMP: (state, action) => {
      state.stomp = action.payload;
    },
    SET_CHANNELLIST: (state, action) => {
      state.channelList = action.payload;
    },
  },
});

export const { SET_STOMP, SET_CHANNELLIST } = tokenSlice.actions;

export default tokenSlice.reducer;
