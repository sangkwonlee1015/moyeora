import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "channelList",
  initialState: {
    channelList: [],
    stomp: null,
  },
  reducers: {
    SET_STOMP: (state, action) => {
      state.stomp = action.payload;
    },
    SET_CHANNELLIST: (state, action) => {
      state.channelList = action.payload.sort((a, b) => {
        return a.channelSeq - b.channelSeq;
      });
    },
  },
});

export const { SET_STOMP, SET_CHANNELLIST } = tokenSlice.actions;

export default tokenSlice.reducer;