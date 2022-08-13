import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  // console.log(
  //   "~~~~~~~~~~~  center : ",
  //   centerLat,
  //   ", ",
  //   centerLng,
  //   "~~~~~~~~~~~~"
  // );

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
                {/* <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder=""
                  style={{ width: 200 }}
                  onInput={(e) => {
                    console.log(e.target.value);
                    commentChange(index, e.target.value);
                  }}
                  // value={marker.comment}
                  defaultValue={marker.comment}
                ></TextareaAutosize> */}
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default MapArea;
