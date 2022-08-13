import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useSelector, useDispatch } from "react-redux";

import SearchPinDialog from "../components/SearchPinDialog/SearchPinDialog";
// import SockJs from "sockjs-client";
// import StompJs from "stompjs";

import TextareaAutosize from "@mui/material/TextareaAutosize";

import Editor from "./EditorComponent";
import { CLICK_PIN, SET_PIN } from "../redux/PinList";
import { createHeaders } from "../api";

function MapArea({ channelSeq, mapSeq, stomp }) {
  const pins = useSelector((state) => state.PinList.pinList);
  const centerLat = useSelector((state) => state.PinList.centerLat);
  const centerLng = useSelector((state) => state.PinList.centerLng);
  const token = useSelector((state) => state.UserInfo.accessToken);

  //pinSearchDialog 관련
  const [visibleSearchPinDialog, setVisibleSearchPinDialog] = useState(false);

  // 최종 리스트 경로 표시
  const [polylineList, setPolylineList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let polys = [];
    pins.map((pin) => {
      if (pin.pinFlag == 1) {
        polys.push(pin);
      }
    });
    polys.sort((a, b) => {
      return a.pinOrder - b.pinOrder;
    });
    let polysList = [];
    polys.map((poly) => {
      polysList.push({ lat: poly.pinLat, lng: poly.pinLng });
    });
    setPolylineList(polysList);
  }, [pins]);

  const commentChange = (index, e) => {
    console.log(e);
    if (stomp) {
      let chatMessage = {
        receiver: channelSeq,
        pinSeq: pins.at(index).seq,
        pinContent: e.getHTML(),
        // pinContent: e,
        pinColor: "test",
        status: "MODPIN", // pin 정보 추가하기 (order, flag, title 추가해주기)
      };
      stomp.send("/app/private-message", null, JSON.stringify(chatMessage));
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: centerLat,
          lng: centerLng,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={pins.length > 0 ? 11 : 13} // 지도의 확대 레벨
        onClick={(_t, mouseEvent) => {
          console.log("pins", pins);
          if (stomp) {
            let chatMessage = {
              receiver: channelSeq,
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
              pinTitle: "새 핀",
              pinColor: "test",
              mapSeq: mapSeq,
              status: "ADDPIN",
            };
            stomp.send(
              "/app/private-message",
              createHeaders(token),
              JSON.stringify(chatMessage)
            );
          }
        }}
      >
        {pins.map((marker, index) => (
          <MapMarker
            key={`${index}`}
            position={{
              lat: Number(marker.pinLat),
              lng: Number(marker.pinLng),
            }}
            onClick={() => {
              dispatch(CLICK_PIN({ pinSeq: marker.pinSeq }));
            }}
          >
            {marker.isVisible && (
              <div>
                <Editor
                  value={marker.comment}
                  onChange={commentChange}
                  index={index}
                />
              </div>
            )}
          </MapMarker>
        ))}
        <Polyline
          path={[polylineList]}
          strokeWeight={5} // 선의 두께
          strokeColor={"#FFAE00"} // 선의 색깔
          strokeOpacity={0.7} // 선의 불투명도(0~1)
          strokeStyle={"solid"} // 선의 스타일
          endArrow={true} // 화살표 여부
        />
      </Map>

      <button
        style={{ position: "fixed", zIndex: 1, top: 10, left: 350 }}
        onClick={() => {
          setVisibleSearchPinDialog(true);
        }}
      >
        Pin 검색
      </button>
      <SearchPinDialog
        open={visibleSearchPinDialog}
        setVisibleSearchPinDialog={() => {
          setVisibleSearchPinDialog(false);
        }}
        stomp={stomp}
        mapSeq={mapSeq}
        channelSeq={channelSeq}
      ></SearchPinDialog>
    </div>
  );
}

export default MapArea;
