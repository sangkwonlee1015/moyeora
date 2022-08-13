import { createSlice } from "@reduxjs/toolkit";

export const pinListSlice = createSlice({
  name: "pinList",
  initialState: {
    currentMap: -1,
    pinList: [],
  },
  reducers: {
    SET_PINLIST: (state, action) => {
      console.log(action.payload);
      if (state.currentMap == action.payload.mapSeq)
        state.pinList = action.payload.pinList;
      console.log("state.pinList : ", state.pinList);
    },
    ADD_PIN: (state, action) => {
      if (state.currentMap == action.payload.mapSeq)
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
        if (pin.pinSeq === action.payload.pinSeq) {
          pin.isVisible = !pin.isVisible;
        }
      });
    },
    DELETE_PIN: (state, action) => {
      state.pinList.map((pin, idx) => {
        if (pin.seq === action.payload.pinSeq) {
          state.pinList.splice(idx, 1);
        }
      });
    },
    SET_PINORDER_DIFFLAG: (state, action) => {
      if (state.currentMap == action.payload.mapSeq) {
        state.pinList.map((pin) => {
          if (pin.pinFlag == action.payload.pinFlag) {
            if (pin.pinOrder > action.payload.sourceOrder) {
              pin.pinOrder -= 1;
            } else if (pin.pinOrder == action.payload.sourceOrder) {
              pin.pinFlag = pin.pinFlag ^ 1;
              pin.pinOrder = action.payload.destinationOrder;
            }
          } else {
            if (pin.pinOrder >= action.payload.destinationOrder) {
              pin.pinOrder += 1;
            }
          }
        });
      }
    },
    //   if(출발지 index가 도착지 index보다 작다면)
    // 	출발지 index 초과, 도착지 index 이하의 index인 핀을 -1
    // 	출발지 index의 핀의 index를 도착지 index로 변경
    // if(출발지 index가 도착지 index보다 크다면)
    // 	출발지 index 미만, 도착지 index 이상의 index인 핀을 +1
    // 	출발지 index의 핀의 index를 도착지 index로 변경
    SET_PINORDER_SAMEFLAG: (state, action) => {
      if (state.currentMap == action.payload.mapSeq) {
        state.pinList.map((pin) => {
          if (pin.pinFlag == action.payload.pinFlag) {
            if (action.payload.sourceOrder < action.payload.destinationOrder) {
              // 출발 order가 도착 order보다 작다면
              if (
                pin.pinOrder > action.payload.sourceOrder &&
                pin.pinOrder <= action.payload.destinationOrder
              ) {
                pin.pinOrder -= 1;
              } else if (pin.pinOrder == action.payload.sourceOrder) {
                pin.pinOrder = action.payload.destinationOrder;
              }
            } else {
              // 출발 order가 도착 order보다 크다면
              if (
                pin.pinOrder >= action.payload.destinationOrder &&
                pin.pinOrder < action.payload.sourceOrder
              ) {
                pin.pinOrder += 1;
              } else if (pin.pinOrder == action.payload.sourceOrder) {
                pin.pinOrder = action.payload.destinationOrder;
              }
            }
          }
        });
      }
    },
    SET_CURRENTMAP: (state, action) => {
      state.currentMap = action.payload;
    },
  },
});

export const {
  SET_PINLIST,
  ADD_PIN,
  SET_PIN,
  CLICK_PIN,
  SET_PINORDER_DIFFLAG,
  SET_PINORDER_SAMEFLAG,
  SET_CURRENTMAP,
} = pinListSlice.actions;
// export const pinsSelector = (state) => state.pinList;

export default pinListSlice.reducer;
