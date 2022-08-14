/*global kakao*/

import { useState, useEffect, createElement } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Map, MapMarker, Roadview } from "react-kakao-maps-sdk";
import "./SearchPinDialog.css";
import RoadView from "./RoadView";
import { createHeaders } from "../../api";
import { useSelector } from "react-redux";

function SearchPinDialog({
  open,
  setVisibleSearchPinDialog,
  stomp,
  mapSeq,
  channelSeq,
  pinColor,
}) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchBarInput, setSearchBarInput] = useState("");
  const [ps, setPs] = useState(undefined);
  //   const [infoWindow, setInfoWindow] = useState(undefined);
  const [pagination, setPagination] = useState(undefined);
  const [searchResult, setSearchResult] = useState([]);
  const [visibleRoadViewDialog, setVisibleRoadViewDialog] = useState(false);
  const [roadViewX, setRoadViewX] = useState(null);
  const [roadViewY, setRoadViewY] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [mapLevel, setMapLevel] = useState(3);
  // const [selectedPin, setSelectedPin] = useState([]);
  const token = useSelector((state) => state.UserInfo.accessToken);

  useEffect(() => {
    if (!map) return;
    setPs(new kakao.maps.services.Places());
  }, [map]);

  function searchPlaces(e) {
    e.preventDefault();

    if (searchBarInput === "") return;

    ps.keywordSearch(searchBarInput, (data, status, _pagination) => {
      removeMarker();
      setSearchResult(data);
      setPagination(_pagination);
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기

        for (var i = 0; i < data.length; i++) {
          var imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, i * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          };
          var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(data[i].y, data[i].x), // 마커의 위치
            image: markerImage,
          });
          marker.setMap(map);
          setMarkers((current) => {
            return [...current, marker];
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }

  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  }

  function displayPagination() {
    if (!pagination) return;
    var array = [];
    //   const element = createElement("div",)
    for (var i = 1; i <= pagination.last; i++) {
      const num = i;
      if (i === pagination.current)
        array.push(createElement("a", { href: "#", className: "on" }, i));
      else
        array.push(
          createElement(
            "a",
            {
              href: "#",
              onClick: () => {
                removeMarker();
                pagination.gotoPage(num);
              },
            },
            i
          )
        );
    }
    const temp = createElement("div", { id: "pagination" }, array);
    return temp;
  }

  return (
    <div>
      <Dialog maxWidth={"xl"} open={open}>
        <DialogContent>
          <Map // 로드뷰를 표시할 Container
            center={mapCenter}
            style={{
              width: 1300,
              height: 600,
            }}
            level={mapLevel}
            onCreate={setMap}
            onZoomChanged={(map) => setMapLevel(map.getLevel())}
          ></Map>
          <div id="menu_wrap" className="bg_white">
            <div className="option">
              <div>
                <form onSubmit={searchPlaces}>
                  <input
                    type="text"
                    value={searchBarInput}
                    onChange={(e) => {
                      setSearchBarInput(e.target.value);
                    }}
                    id="keyword"
                    size="15"
                  ></input>
                  <button type="submit">검색하기</button>
                </form>
              </div>
            </div>
            <hr></hr>
            <ul
              // style={{
              //   margin: 0,
              //   padding: 0,
              //   border: 0,
              //   fontSize: "100%",
              // font: inherit,
              // verticalAlign: baseline,
              // }}
              id="placesList"
            >
              {searchResult.map((item, index) => {
                return (
                  <li key={index} className={"item"}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRoadViewX(item.x);
                        setRoadViewY(item.y);
                        setVisibleRoadViewDialog(true);
                      }}
                    >
                      로드뷰 보기
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setMapCenter({
                          lat: item.y,
                          lng: item.x,
                        });
                        setMapLevel(2);
                      }}
                    >
                      찾기
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (stomp) {
                          let chatMessage = {
                            receiver: channelSeq,
                            lat: item.y,
                            lng: item.x,
                            pinTitle: item.place_name,
                            pinColor: pinColor,
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
                      추가
                    </button>
                    {/* {item.selected ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPin((current) => {
                            const temp = current;
                            for (let i = 0; i < temp.length; i++) {
                              if (temp[i].pinTitle === item.place_name) {
                                temp.splice(i, 1);
                                i--;
                              }
                            }
                            return temp;
                          });
                          item.selected = false;
                        }}
                      >
                        목록에서 삭제
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPin((current) => {
                            return [
                              ...current,
                              {
                                lat: item.y,
                                lng: item.x,
                                pinTitle: item.place_name,
                              },
                            ];
                          });
                          item.selected = true;
                        }}
                      >
                        목록 추가
                      </button>
                    )} */}

                    <span className={"markerbg marker_" + (index + 1)}></span>
                    <div className={"info"}>
                      <h5>{item.place_name}</h5>
                      <span>{item.road_address_name}</span>
                      <span className={"jibun gray"}>{item.address_name}</span>
                      <span className={"tel"}>{item.phone}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            {displayPagination(pagination)}
          </div>
          <RoadView
            visibleRoadViewDialog={visibleRoadViewDialog}
            setVisibleRoadViewDialog={() => {
              setVisibleRoadViewDialog(false);
            }}
            positionX={roadViewX}
            positionY={roadViewY}
          ></RoadView>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setVisibleSearchPinDialog();
            }}
          >
            검색 종료
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SearchPinDialog;
