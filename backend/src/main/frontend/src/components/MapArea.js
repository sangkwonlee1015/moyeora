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

import SelectPin from "./SelectPin/SelectPin";
import PinOrange from "./SelectPin/asset/PinOrange.svg";
import PinRed from "./SelectPin/asset/PinRed.svg";
import PinBlack from "./SelectPin/asset/PinBlack.svg";
import PinYellow from "./SelectPin/asset/PinYellow.svg";
import PinGreen from "./SelectPin/asset/PinGreen.svg";
import PinWhale from "./SelectPin/asset/PinWhale.svg";
import PinBlue from "./SelectPin/asset/PinBlue.svg";
import PinPurple from "./SelectPin/asset/PinPurple.svg";
import PinSky from "./SelectPin/asset/PinSky.svg";
import PinPink from "./SelectPin/asset/PinPink.svg";

function MapArea({ channelSeq, mapSeq, stomp }) {
  const pins = useSelector((state) => state.PinList.pinList);
  const centerLat = useSelector((state) => state.PinList.centerLat);
  const centerLng = useSelector((state) => state.PinList.centerLng);
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [_pinColor, _setPinColor] = useState(PinBlack);

  //pinSearchDialog 관련
  const [visibleSearchPinDialog, setVisibleSearchPinDialog] = useState(false);

  // 최종 리스트 경로 표시
  const [polylineList, setPolylineList] = useState([]);
  const [currentMapLevel, setCurrentMapLevel] = useState(12);
  const mapRef = useRef();
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

  const editorChange = (index, value, type) => {
    console.log("type : ", type);
    if (stomp) {
      let chatMessage = {
        receiver: channelSeq,
        pinSeq: pins.at(index).pinSeq,
        mapSeq: Number(mapSeq),
      };
      if (type == "title") {
        chatMessage.pinTitle = value;
        chatMessage.status = "MODPIN_TITLE";
        dispatch(
          SET_PIN({
            pinSeq: pins.at(index).pinSeq,
            type: "title",
            pinTitle: value,
            mapSeq: Number(mapSeq),
          })
        );
      } else if (type == "content") {
        chatMessage.pinContent = value;
        chatMessage.status = "MODPIN_CONTENT";
        dispatch(
          SET_PIN({
            pinSeq: pins.at(index).pinSeq,
            type: "content",
            pinContent: value,
            mapSeq: Number(mapSeq),
          })
        );
      }
      stomp.send(
        "/app/private-message",
        createHeaders(token),
        JSON.stringify(chatMessage)
      );
    }
  };

  const mapCreate = () => {
    console.log("mapCreate");
  };

  function getPinColorObj(str) {}

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
        level={3} // 지도의 확대 레벨
        ref={mapRef}
        onClick={(_t, mouseEvent) => {
          console.log("pins", pins);
          if (stomp) {
            let chatMessage = {
              receiver: channelSeq,
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
              pinTitle: "새 핀",
              pinColor: _pinColor,
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
        // onCreate={mapCreate}
        onCreate={() => {
          console.log("~~~mapCreate~~~");
          const map = mapRef.current;
          if (map) map.setLevel(currentMapLevel);
        }}
        onZoomChanged={() => {
          const map = mapRef.current;
          setCurrentMapLevel(map.getLevel());
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
            image={{
              src: marker.pinColor, // 마커이미지의 주소입니다
              size: {
                width: 36,
                height: 36,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 18,
                  y: 36,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          >
            {marker.isVisible && (
              <div>
                <Editor
                  value={{
                    title: marker.pinTitle,
                    content: marker.pinContent,
                  }}
                  onChange={editorChange}
                  index={index}
                />
              </div>
            )}
          </MapMarker>
        ))}
        <Polyline
          path={[polylineList]}
          strokeWeight={5} // 선의 두께
          strokeColor={"#d90429"} // 선의 색깔
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
      <SelectPin
        active={(param) => {
          _setPinColor(param);
        }}
      ></SelectPin>
      <SearchPinDialog
        open={visibleSearchPinDialog}
        setVisibleSearchPinDialog={() => {
          setVisibleSearchPinDialog(false);
        }}
        stomp={stomp}
        mapSeq={mapSeq}
        channelSeq={channelSeq}
        pinColor={_pinColor}
      ></SearchPinDialog>
    </div>
  );
}

export default MapArea;
