import { combineReducers } from "redux";

const initUser = {
  user: {
    userName: "JY",
    userServer: [
      {
        channelId: 1,
        channelName: "ch1",
      },
      {
        channelId: 2,
        channelName: "ch2",
      },
      {
        channelId: 3,
        channelName: "ch3",
      },
    ],
  },
};

const userReducer = (state = initUser, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

const stompReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_STOMP":
      return { ...state, stomp: action.payload };

    default:
      return state;
  }
};

const reducers = combineReducers({ userReducer, stompReducer });

export default reducers;
