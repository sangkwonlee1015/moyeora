import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Homepage from "./Homepage";
import ChannelHomePage from "./ChannelHomePage";
import AddChannelPage from "./AddChannelPage";
import ArticlePage from "./ArticlePage";
import MypageSetingPage from "./MypageSettingPage";
import ChattingPage from "./ChattingPage";
import OvPage from "./OVPage";
import MapPage from "./MapPage";
import LoginPage from "./LoginPage";
import PrivateRoute from "../routes/PrivateRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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
                    setLoggedIn(false);
                  }}
                />
              ) : (
                <LoginPage
                  setLogIn={() => {
                    setLoggedIn(true);
                  }}
                ></LoginPage>
              )
            }
          />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/serverpage/:serverid" element={<ChannelHomePage />} />
            <Route path="/addchannelpage" element={<AddChannelPage />} />
            <Route path="/articlepage" element={<ArticlePage />} />
            <Route path="/mypagesettingpage" element={<MypageSetingPage />} />
            <Route path="/chattingpage" element={<ChattingPage />} />
            <Route path="/mappage" element={<MapPage />} />
            <Route path="/ovpage" element={<OvPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
