import { createSlice } from "@reduxjs/toolkit";


export const pinListSlice = createSlice({
  name: "pinList",
  initialState: {
    pinList: [],
  },
  reducers: {
    // SET_PINLIST: (state, action) => {
    //   state.pinList = action.payload;
    //   console.log("state.pinList : ", state.pinList);
    // },
    ADD_PIN: (state, action) => {
      // state.pinList.push(action.payload);
      state.pinList = [...state.pinList, action.payload];
    },
    SET_PIN: (state, action) => {
      console.log(action.payload);
      state.pinList.map((pin) => {
        if (pin.seq === action.payload.pinSeq) {
          pin.color = action.payload.pinColor
            ? action.payload.pinColor
            : pin.color;
          pin.comment = action.payload.pinContent
            ? action.payload.pinContent
            : pin.comment;
        }
      });
    },
    CLICK_PIN: (state, action) => {
      state.pinList.map((pin) => {
        if (pin.seq === action.payload.pinSeq) {
          pin.isVisible = !pin.isVisible;
        }
      });
    },
    DELETE_PIN: (state, action) => {
      state.pinList.map((pin, idx) => {
        if (pin.seq === action.payload.pinSeq) {
          state.pinList.splice(idx, 1)
        }
      });
      }
    },
});

export const { SET_PINLIST, ADD_PIN, SET_PIN, CLICK_PIN } =
  pinListSlice.actions;
// export const pinsSelector = (state) => state.pinList;

export default pinListSlice.reducer;
