import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPinList } from "../../api/pin";
import { SET_CURRENTMAP } from "../../redux/PinList";
import { SET_PINLIST } from "../../redux/PinList";
import { deleteMap, getMapList } from "../../api/map";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import "./Sidebar.css";
import { useState } from "react";
import { SET_MAPLIST } from "../../redux/MapList";

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

function Map(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const dispatch = useDispatch();
  const ChannelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  function openMap(mapSeq) {
    dispatch(SET_CURRENTMAP(mapSeq));
    getPinList(
      mapSeq,
      token,
      (response) => {
        let pinList = response.data.pinList;
        pinList.map((pin) => {
          pin.isVisible = false;
        });
        dispatch(SET_PINLIST({ pinList: pinList, mapSeq: mapSeq }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const DeleteMap = () => {             // 맵 삭제 함수
    const mapSeq = props.mapSeq
    // 맵삭제
    deleteMap(
      mapSeq, 
      token,
      getMapList(                       // 성공하면 맵 리스트 불러와서
        ChannelSeq,
        "channel",
        token,
        (response) => {                 // 삭제한 맵이 response에 담겨옴 (문제 발생)
          const list = response.data.mapsList;
          const arr = list.filter(data => data.mapSeq !== mapSeq);  // fliter로 해결!
          dispatch(SET_MAPLIST(arr));  // 맵 redux에 다시 저장
          handleClose();
        },
      ), 
      (error) => console.log(error)     // 실패하면
    )
  }

  return (
    <div>
      <span>
        <Link
          to={`/mappage/${ChannelSeq}/${props.mapSeq}`}
          onClick={() => {
            openMap(props.mapSeq);
          }}
        >
          {props.mapName}
        </Link>
      </span>
      <span>
        <button onClick={handleOpen}>
          <ion-icon name="trash-outline"></ion-icon>
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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="white"
            >
              정말 맵을 삭제하시겠습니까?
              <Stack
                direction="row-reverse"
                alignItems="center"
                spacing={2}
                style={{ marginTop: "2rem" }}
              >
                <Button onClick={handleClose}>취소</Button>
                <Button
                  onClick={DeleteMap}
                  variant="outlined"
                  color="error"
                >
                  맵 삭제하기
                </Button>
              </Stack>
            </Typography>
          </Box>
        </Modal>
      </span>
    </div>
  );
}

export default Map;
