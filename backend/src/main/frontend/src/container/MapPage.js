import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MapArea from "../components/MapArea";
import MapMarkerList from "../components/MapMarkerList";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import VideoRoomComponent from "../components/Openvidu/VideoRoomComponent";
import { getChannelInfo } from "../api/channel";
import { useSelector } from "react-redux";

function MapPage() {
  const sock = new SockJs("http://localhost:8080/ws");
  // const sock = new SockJs("https://i7a407.p.ssafy.io/ws");
  const stomp = StompJs.over(sock);
  const [channelToken, setChannelToken] = useState("");
  const token = useSelector((state) => state.UserInfo.accessToken);
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  const channelSeq = useParams().channelSeq;
  const mapSeq = useParams().mapSeq;
  const [visibleVideoComponent, setVisibleVideoComponent] = useState(false);

  useEffect(() => {
    stomp.connect({}, (e) => {});
    getChannelInfo(
      channelSeq,
      token,
      (response) => {
        setChannelToken(response.data.token);
        console.log("channelToken: " + response.data.token);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="comp mappage">
      <Header />
      <Sidebar />
      <div className="comp">
        <MapArea channelSeq={channelSeq} mapSeq={mapSeq} stomp={stomp} />
        <button
          onClick={() => {
            setVisibleVideoComponent(!visibleVideoComponent);
          }}
        ></button>
        {visibleVideoComponent ? (
          <VideoRoomComponent
            sessionName={channelSeq}
            user={userInfo.userNick}
            token={channelToken}
          ></VideoRoomComponent>
        ) : null}

        <MapMarkerList stomp={stomp} />
      </div>
    </div>
  );
}

export default MapPage;
