import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import './App.css';
import Homepage from './Homepage';
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;