import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "mapList",
  initialState: {
    mapList: [],
  },
  reducers: {
    SET_MAPLIST: (state, action)=>{
      state.mapList = action.payload;
    },
  },
});

export const { SET_MAPLIST } = tokenSlice.actions;

export default tokenSlice.reducer;
