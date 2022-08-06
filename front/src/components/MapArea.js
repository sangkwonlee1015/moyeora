import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { useSelector } from "react-redux";

function MapArea() {
  const [markers, setMarkers] = useState([]);
  const stomp = useSelector((state) => state.stompReducer.stomp);

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
          setMarkers([
            ...markers,
            {
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
              comment: "test",
              isVisible: false,
            },
          ]);
          console.log(markers.at(0) ? markers.at(0).isVisible : null);
          // if (stomp) {
          //   console.log(stomp.send);
          //   let chatMessage = {
          //     receiver: 2,
          //     longitude: mouseEvent.latLng.getLat(),
          //     latitude: mouseEvent.latLng.getLng(),
          //     status: "ADDPIN",
          //   };
          //   stomp.send(
          //     "/app/private-message",
          //     null,
          //     JSON.stringify(chatMessage)
          //   );
          //   stomp.subscribe("/user/" + 2 + "/private", (data) => {
          //     const message = JSON.parse(data.body);
          //   });
          // }
        }}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              console.log(index);
              marker.isVisible = !marker.isVisible;
              setMarkers([...markers]);
            }}
          >
            {markers.at(index).isVisible && <div>{index}</div>}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default MapArea;
