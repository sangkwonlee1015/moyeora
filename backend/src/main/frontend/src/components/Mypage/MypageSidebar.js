import { useSelector } from "react-redux";
import Map from "./Map";
import { getMapList, registerMap } from "../../api/map";
import UserInfo from "../Sidebar/UserInfo";
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
import {
  ADD_PIN,
  SET_PIN,
  SET_PINORDER_DIFFLAG,
  SET_PINORDER_SAMEFLAG,
} from "../../redux/PinList";
import "./Mypage.css";


function MypageSideBar(props){
  const token = useSelector((state) => state.UserInfo.accessToken);
  const mapList = useSelector((state) => state.MapList.mapList);
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const dispatch = useDispatch();
  const [mapName, setMapName] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setMapName("");
  };
  const handleOpen = () => setOpen(true);

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
    console.log(mapName);
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
        console.log(response);
        getMapList(
          channelSeq,
          "channel",
          token,
          (response) => {
            dispatch(SET_MAPLIST(response.data.mapsList));
            handleClose();
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
      <div className="mypage-sidebar">
        MapList
        <button onClick={handleOpen} className="mapPlusButton tooltip" >
          +
          <span className="tooltip-text">
            Map 추가
          </span>
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


        <div className="mypage-sidebar">
          <Map channelSeq={props.channelSeq} />
        </div>

      </div>
    </div>

  )
}

export default MypageSideBar

