import React from 'react';
//import ReactDOM from 'react-dom/client';  // react 18
import ReactDOM from 'react-dom'; // react ~17
import './index.css';
import App from './container/App';
import reportWebVitals from './reportWebVitals';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const testRedux = 100;

function reduxTest(state = testRedux, action){
  return state
}

let store = createStore(reduxTest)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode >
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );  // 18~

ReactDOM.render(
  <React.StrictMode >
      <Provider store={store}>
       <App />
     </Provider>
   </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
