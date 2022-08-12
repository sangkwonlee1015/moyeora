import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "channelList",
  initialState: {
    channelList: [],
    stomp: null,
    channelSeq: null
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
    SET_CHANNELSEQ: (state, action) => {
      state.channelSeq = action.payload;
    },
  },
});

export const { SET_STOMP, SET_CHANNELLIST, SET_CHANNELSEQ } = tokenSlice.actions;

export default tokenSlice.reducer;
