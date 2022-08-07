import { createStore } from 'redux';  // 리액트 18이 나오면서 리덕스가 권장사항이 아니게 되어 취소선이 뜨지만 기능상 문제없음.
import reducers from './reducers';

const store = createStore(reducers);
export default store;