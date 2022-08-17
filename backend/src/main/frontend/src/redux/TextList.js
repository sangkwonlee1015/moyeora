import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "textList",
  initialState: {
    textList: [],
  },
  reducers: {
    SET_TEXTLIST: (state, action) => {
      console.log(action.payload);
      state.textList = action.payload;
    },
  },
});

export const { SET_TEXTLIST } = tokenSlice.actions;

export default tokenSlice.reducer;
