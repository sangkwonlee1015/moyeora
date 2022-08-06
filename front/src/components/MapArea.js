import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapArea() {
  const [markers, setMarkers] = useState([
    { title: "11", lat: 33.450701, lng: 126.570667 },
  ]);
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
              title: "test",
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            },
          ]);
        }}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`${marker.title}-${marker.latlng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </Map>
    </div>
  );
}

export default MapArea;
