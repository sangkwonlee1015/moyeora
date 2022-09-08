import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Homepage from "./Homepage";
import ChannelHomePage from "./ChannelHomePage";
import SearchChannelPage from "./SearchChannelPage";
import ArticlePage from "./ArticlePage";
import MypageSettingPage from "./MypageSettingPage";
import ChattingPage from "./ChattingPage";
import OvPage from "./OVPage";
import MapPage from "./MapPage";
import LoginPage from "./LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { SET_LOGOUT } from "../redux/UserInfo";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.UserInfo.loggedIn);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              loggedIn ? (
                <Homepage
                  setLogOut={() => {
                    dispatch(SET_LOGOUT());
                  }}
                />
              ) : (
                <LoginPage></LoginPage>
              )
            }
          />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/serverpage/:serverid" element={<ChannelHomePage />} />
          <Route path="/searchchannelpage" element={<SearchChannelPage />} />
          <Route path="/articlepage" element={<ArticlePage />} />
          <Route path="/mypagesettingpage" element={<MypageSettingPage />} />
          <Route path="/chattingpage" element={<ChattingPage />} />
          <Route path="/mappage/:channelSeq/:mapSeq" element={<MapPage />} />
          <Route path="/ovpage" element={<OvPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
