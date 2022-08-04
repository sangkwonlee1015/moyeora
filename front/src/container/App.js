import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import './App.css';
import Homepage from './Homepage';
<<<<<<< HEAD
import LoginPage from './LoginPage';
import Header from "../components/header/Header";
import ChattingPage from "../components/Sidebar/Chatting";

function App() {
  let LoggedIn = true;
  return (
    <div>
      {LoggedIn ? <Header/> : null}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={LoggedIn ? <Homepage/> : <LoginPage/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/:channelId/chattingpage" element={<ChattingPage/>}/>
          <Route path="/:channelId/mappage/" element={<Homepage/>}/>
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/home" element={<Homepage/>}/>
=======
import ChannelHomePage from "./ChannelHomePage";
import AddChannelPage from "./AddChannelPage";
import ArticlePage from "./ArticlePage";
import MypageSetingPage from "./MypageSettingPage";
import ChattingPage from "./ChattingPage";
import OvPage from "./OVPage";
import MapPage from "./MapPage"

let LoggedIn = false;


function App() {

  return (
  
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={LoggedIn ? <Homepage/> : <Homepage/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/serverpage/:serverid" element={<ChannelHomePage/>}/>
          <Route path="/addchannelpage" element={<AddChannelPage/>}/>
          <Route path="/articlepage" element={<ArticlePage/>}/>
          <Route path="/mypagesettingpage" element={<MypageSetingPage/>}/>
          <Route path="/chattingpage" element={<ChattingPage/>}/>
          <Route path="/mappage" element={<MapPage/>}/>
          <Route path="/ovpage" element={<OvPage/>}/>
>>>>>>> front-temp
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;