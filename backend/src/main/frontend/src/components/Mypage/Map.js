import { Link } from "react-router-dom";
import { getPinList } from "../../api/pin";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENTMAP } from "../../redux/PinList";
import { SET_PINLIST } from "../../redux/PinList";
import { deleteMap, getMapList } from "../../api/map";
import { SET_MAPLIST } from "../../redux/MapList";
// import "./Sidebar.css";

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
        1,
        "user",
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
        <button onClick={DeleteMap}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </span>
    </div>
  );
}

export default Map;
