import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
<<<<<<< HEAD
import './App.css';
import Homepage from './Homepage';
<<<<<<< HEAD
import LoginPage from './LoginPage';
=======
import "./App.css";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
>>>>>>> 6934999e9e74a8d3e8670701f47f087a02545f7e
import Header from "../components/header/Header";
import ChattingPage from "../components/Sidebar/Chatting";

function App() {
  let LoggedIn = false;
  return (
    <div>
      {LoggedIn ? <Header /> : null}
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
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
=======
          <Route path="/" element={LoggedIn ? <Homepage /> : <LoginPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/:channelId/chattingpage" element={<ChattingPage />} />
          <Route path="/:channelId/mappage/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
>>>>>>> 6934999e9e74a8d3e8670701f47f087a02545f7e
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
