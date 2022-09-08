import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ChattingArea from "../components/ChattingArea";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import React, { useEffect } from "react";

function ChattingPage() {
  const sock = new SockJs("http://localhost:8080/ws");
  // const sock = new SockJs("https://i7a407.p.ssafy.io/ws");
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
      <Sidebar />
      <ChattingArea stomp={stomp} />
    </div>
  );
}

export default ChattingPage;
