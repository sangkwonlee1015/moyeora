import { Link } from "react-router-dom";
import "./Sidebar.css"
import React, { useEffect, useState } from "react";
// import MapArea from "../MapArea";
import { useParams } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import VideoRoomComponent from "..//Openvidu/VideoRoomComponent";
import { getChannelInfo } from "../../api/channel";
import { useSelector } from "react-redux";


function Ov(){
  const sock = new SockJs("http://localhost:8080/ws");
  // const sock = new SockJs("https://i7a407.p.ssafy.io/ws");
  const stomp = StompJs.over(sock);
  const [channelToken, setChannelToken] = useState("");
  const token = useSelector((state) => state.UserInfo.accessToken);
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  const channelSeq = useParams().channelSeq;
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
  return(
    <div className="sidebar-test" style={{display:"flex"}}>
      <button
        onClick={() => {
          setVisibleVideoComponent(!visibleVideoComponent);
        }}
      >비디오채널</button>
      {visibleVideoComponent ? (
        <VideoRoomComponent
          sessionName={channelSeq}
          user={userInfo.userNick}
          token={channelToken}
        ></VideoRoomComponent>
      ) : null}
    </div>
    
  )
}

export default Ov

