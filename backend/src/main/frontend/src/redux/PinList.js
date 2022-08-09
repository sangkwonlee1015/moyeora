import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "pinList",
  initialState: {
    pinList: [],
  },
  reducers: {
    SET_PINLIST: (state, action) => {
      state.pinList = action.payload;
    },
  },
});

export const { SET_PINLIST } = tokenSlice.actions;

export default tokenSlice.reducer;
