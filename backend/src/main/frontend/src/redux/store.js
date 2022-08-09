// import { createStore } from 'redux';  // 리액트 18이 나오면서 리덕스가 권장사항이 아니게 되어 취소선이 뜨지만 기능상 문제없음.
// import reducers from './reducers';

// const store = createStore(reducers);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./UserInfo";
import channelListReducer from "./ChannelList";
import mapListReducer from "./MapList";
import pinListReducer from "./PinList";

export default configureStore({
  reducer: {
    UserInfo: userInfoReducer,
    ChannelList: channelListReducer,
    MapList: mapListReducer,
    PinList: pinListReducer
  },
});
