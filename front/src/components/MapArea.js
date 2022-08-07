import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapArea() {
  const [markers, setMarkers] = useState([]);
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
            },
          ]);
          console.log(markers);
        }}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={`${index}`}
            onClick={() => {}}
          >
            {<div>{marker.comment}</div>}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default MapArea;
