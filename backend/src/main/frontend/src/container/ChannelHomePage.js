import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ChannelHome from "../components/ChannelHome";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import StompJs from "stompjs";
import { useEffect } from "react";

function ChannelHomePage() {
  // const sock = new SockJS("http://localhost:8080/ws");
  const sock = new SockJS("https://i7a407.p.ssafy.io/ws");
  const stomp = StompJs.over(sock);

  useEffect(() => {
    stomp.connect({}, (e) => {});
    return () => {
      stomp.disconnect(() => {});
    };
  }, []);

  return (
    <div className="comp">
      <Header />
      <Sidebar channelSeq={useParams().serverid} />
      <ChannelHome channelSeq={useParams().serverid} stomp={stomp} />
    </div>
  );
}

export default ChannelHomePage;
