import { useSelector } from "react-redux";
import Chatting from "./Chatting";
import Map from "./Map";
import "./Sidebar.css";
// import Ov from "./Ov";
import { getMapList, registerMap } from "../../api/map";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import { SET_MAPLIST } from "../../redux/MapList";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import SockJS from "sockjs-client";
import StompJs from "stompjs";
import { Backdrop, CircularProgress } from "@mui/material";
import { getChannelInfo } from "../../api/channel";
import {
  ADD_PIN,
  DELETE_PIN,
  SET_PIN,
  SET_PINORDER_DIFFLAG,
  SET_PINORDER_SAMEFLAG,
} from "../../redux/PinList";
import { getTextList } from "../../api/channel";
import { SET_TEXTLIST } from "../../redux/TextList";
import VideoRoomComponent from "../Openvidu/VideoRoomComponent";
import { createHeaders } from "../../api";

function Sidebar(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const mapList = useSelector((state) => state.MapList.mapList);
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const userNick = useSelector((state) => state.UserInfo.userInfo.userNick);
  const dispatch = useDispatch();
  const [mapName, setMapName] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setMapName("");
  };
  const handleOpen = () => setOpen(true);
  const [backdropOpen, setBackdropOpen] = useState(true);
  const sock = new SockJS("http://localhost:8080/ws");
  const stomp = StompJs.over(sock);

  console.log("channelSeq: " + channelSeq + " / userNick: " + userNick);

  useEffect(() => {
    setBackdropOpen(true);
    stomp.connect({}, (e) => {
      stomp.subscribe("/user/" + channelSeq + "/private", (data) => {
        const message = JSON.parse(data.body);
        switch (message.status) {
          case "ADDPIN":
            const newPin = {
              pinSeq: Number(message.pinSeq),
              pinLat: message.lat,
              pinLng: message.lng,
              pinColor: message.pinColor,
              pinTitle: message.pinTitle,
              pinOrder: Number(message.pinOrder),
              pinFlag: 0,
              mapSeq: Number(message.mapSeq),
              userSeq: Number(message.userSeq),
              isVisible: false,
            };
            dispatch(ADD_PIN(newPin));
            break;
          case "MODPIN_TITLE":
            if (`Bearer ${token}` != message.sender) {
              dispatch(
                SET_PIN({
                  pinSeq: Number(message.pinSeq),
                  type: "title",
                  pinTitle: message.pinTitle,
                  mapSeq: Number(message.mapSeq),
                })
              );
            }
            break;
          case "MODPIN_CONTENT":
            if (`Bearer ${token}` != message.sender) {
              dispatch(
                SET_PIN({
                  pinSeq: Number(message.pinSeq),
                  type: "content",
                  pinContent: message.pinContent,
                  mapSeq: Number(message.mapSeq),
                })
              );
            }
            break;
          case "MOD_PINLIST_DIFFLAG":
            dispatch(
              SET_PINORDER_DIFFLAG({
                mapSeq: Number(message.mapSeq),
                pinFlag: Number(message.pinFlag),
                sourceOrder: Number(message.sourceOrder),
                destinationOrder: Number(message.destinationOrder),
              })
            );
            break;
          case "MOD_PINLIST_SAMEFLAG":
            dispatch(
              SET_PINORDER_SAMEFLAG({
                mapSeq: Number(message.mapSeq),
                pinFlag: Number(message.pinFlag),
                sourceOrder: Number(message.sourceOrder),
                destinationOrder: Number(message.destinationOrder),
              })
            );
            break;
          case "DEL_PIN":
            dispatch(
              DELETE_PIN({
                mapSeq: Number(message.mapSeq),
                pinFlag: Number(message.pinFlag),
                sourceOrder: Number(message.sourceOrder),
              })
            );
            break;
          case "ADD_TEXT":
            getTextList(
              channelSeq,
              token,
              (response) => {
                console.log("response : ", response.data.textStorageList);
                dispatch(SET_TEXTLIST(response.data.textStorageList));
              },
              (error) => {
                console.log(error);
              }
            );
            break;
          case "DEL_TEXT":
            getTextList(
              channelSeq,
              token,
              (response) => {
                console.log("response : ", response.data.textStorageList);
                dispatch(SET_TEXTLIST(response.data.textStorageList));
              },
              (error) => {
                console.log(error);
              }
            );
            break;
          case "CHANGE_MAP":
            getMapList(
              channelSeq,
              "channel",
              token,
              (response) => {
                dispatch(SET_MAPLIST(response.data.mapsList));
              },
              (error) => {
                console.log(error);
              }
            );
            break;
          default:
        }
      });
      setBackdropOpen(false);
    });
    return () => {
      stomp.disconnect(() => {
        stomp.unsubscribe("sub-0");
      });
    };
  }, [channelSeq]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onChangeMapName = (e) => {
    setMapName(e.target.value);
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      createMap();
    }
  };

  const createMap = () => {
    const mapInfo = {
      channelSeq: channelSeq,
      mapName: mapName,
    };
    registerMap(
      mapInfo,
      token,
      (response) => {
        getMapList(
          channelSeq,
          "channel",
          token,
          (response) => {
            dispatch(SET_MAPLIST(response.data.mapsList));
            handleClose();
            if (stomp) {
              let chatMessage = {
                receiver: channelSeq,
                status: "CHANGE_MAP",
              };
              console.log(chatMessage);
              stomp.send(
                "/app/private-message",
                createHeaders(token),
                JSON.stringify(chatMessage)
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => console.log(error)
    );
  };

  return (
    <div className="sidebar">
      <Backdrop
        sx={{
          width: "100vw",
          height: "100vh",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          opacity: 1
        }}
        open={backdropOpen}
      >
      </Backdrop>
      <Chatting />
      <div className="mapListItem">
        MapList
        <button onClick={handleOpen} className="mapPlusButton tooltip">
          +<span className="tooltip-text">Map 추가</span>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{ backgroundColor: "#202225", borderRadius: "10px" }}
          >
            <h2 style={{ color: "white" }}>맵 만들기</h2>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="white"
            >
              맵 이름
              <br />
              <input
                type="text"
                value={mapName}
                autoFocus
                onChange={onChangeMapName}
                onKeyPress={enterKey}
              ></input>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                style={{ marginTop: "2rem" }}
              >
                <Button variant="outlined" color="success" onClick={createMap}>
                  맵 만들기
                </Button>
                <Button onClick={handleClose} variant="outlined" color="error">
                  취소
                </Button>
              </Stack>
            </Typography>
          </Box>
        </Modal>
        {mapList.map((map) => (
          <Map
            key={map.mapSeq}
            channelSeq={channelSeq}
            mapSeq={map.mapSeq}
            mapName={map.mapName}
            stomp={stomp}
          ></Map>
        ))}
      </div>
      {/* <Ov /> */}
      <UserInfo channelSeq={channelSeq} />
      <div key={channelSeq}>
        <VideoRoomComponent
          sessionName={channelSeq}
          user={userNick}
        ></VideoRoomComponent>
      </div>
    </div>
  );
}
export default Sidebar;
