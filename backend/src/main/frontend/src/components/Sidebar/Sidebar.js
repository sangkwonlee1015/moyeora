import { useSelector } from "react-redux";
import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css";
import { getMapList, registerMap } from "../../api/map";
import UserInfo from "./UserInfo";
import { useState } from "react";
import { SET_MAPLIST } from "../../redux/MapList";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

function Sidebar(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const mapList = useSelector((state) => state.MapList.mapList);
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const dispatch = useDispatch();
  const [mapName, setMapName] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
    setMapName("")
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
    console.log(mapName)
  }
  
  const createMap = () => {
    const mapInfo = {
      "channelSeq": props.channelSeq,
      "mapName": mapName,
    }
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
          handleClose()
        },
        (error) => {
          console.log(error);
        }
      );
    },
      (error) => (console.log(error))
      )
    }
    
  return (
    <div className="sidebar">
      <Chatting />
      <div className="mapListItem">MapList
        <Button onClick={handleOpen}>+</Button>
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
              <h2 style={{color:"white"}}>맵 만들기</h2>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="white"
              >
                맵 이름
                <br/>
                <input
                type="text"
                value={mapName}
                onChange={onChangeMapName}
                ></input>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  style={{ marginTop: "2rem" }}
                >
                  <Button 
                  variant="outlined"
                  color="success"
                  onClick={createMap}
                  >맵 만들기</Button>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="error"
                  >
                    취소
                  </Button>
                </Stack>
              </Typography>
            </Box>
          </Modal>
        {mapList.map((map) => (
          <Map
            key={map.mapSeq}
            channelSeq={props.channelSeq}
            mapSeq={map.mapSeq}
            mapName={map.mapName}
          ></Map>
        ))}
      </div>
      <Ov />
      <UserInfo
      channelSeq={props.channelSeq}/>
    </div>
  );
}
export default Sidebar;
