import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { useSelector } from "react-redux";

function MapArea() {
  const [markers, setMarkers] = useState([]);
  const store = useSelector((state) => state);
  const stomp = store.stompReducer.stomp;
  const pins = store.pinsReducer.pins;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={5} // 지도의 확대 레벨
        onClick={(_t, mouseEvent) => {
          console.log("pins", pins);
          if (stomp) {
            let chatMessage = {
              receiver: 2,
              latitude: mouseEvent.latLng.getLat(),
              longitude: mouseEvent.latLng.getLng(),
              status: "ADDPIN",
            };
            stomp.send(
              "/app/private-message",
              null,
              JSON.stringify(chatMessage)
            );
            console.log("markers: ", markers);
          }
        }}
      >
        {pins.map((marker, index) => (
          <MapMarker
            key={`${index}`}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            onClick={() => {
              console.log(index);
              marker.isVisible = !marker.isVisible;
              setMarkers([...markers]);
            }}
          >
            {marker.isVisible && <div>{marker.comment}</div>}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default MapArea;
