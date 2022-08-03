import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import './App.css';
import Homepage from './Homepage';
import ChannelHomePage from "./ChannelHomePage";
import AddChannelPage from "./AddChannelPage";
import ArticlePage from "./ArticlePage";
import MypageSetingPage from "./MypageSettingPage"
let LoggedIn = false;
function App() {
  
  return (
  
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={LoggedIn ? <Homepage/> : <Homepage/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/serverpage" element={<ChannelHomePage/>}/>
          <Route path="/addchannelpage" element={<AddChannelPage/>}/>
          <Route path="/articlepage" element={<ArticlePage/>}/>
          <Route path="/mypagesettingpage" element={<MypageSetingPage/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Header/> */}
    </div>
  );
}

export default App;