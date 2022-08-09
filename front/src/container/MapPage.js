import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MapArea from "../components/MapArea";
import MapMarkerList from "../components/MapMarkerList";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";

function MapPage() {
  const sock = new SockJs("http://localhost:8080/ws");
  const stomp = StompJs.over(sock);

  useEffect(() => {
    stomp.connect({}, (e) => {});
  }, []);

  return (
    <div className="comp mappage">
      <Header />
      <Sidebar />
      <div className="comp">
        <MapArea channelSeq={useParams().channelSeq} stomp={stomp} />
        <MapMarkerList />
      </div>
    </div>
  );
}

export default MapPage;
