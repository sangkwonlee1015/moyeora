import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPinList } from "../../api/pin";
import { SET_CURRENTMAP } from "../../redux/PinList";
import { SET_PINLIST } from "../../redux/PinList";
import "./Sidebar.css";

function Map(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const dispatch = useDispatch();
  const ChannelSeq = useSelector((state) => state.ChannelList.channelSeq);

  function openMap(mapSeq) {
    getPinList(
      mapSeq,
      token,
      (response) => {
        let pinList = response.data.pinList;
        pinList.map((pin) => {
          pin.isVisible = false;
        });
        dispatch(SET_PINLIST(pinList));
      },
      (error) => {
        console.log(error);
      }
    );
    dispatch(SET_CURRENTMAP(mapSeq));
  }

  const DeleteMap = (() => console.log('맵 삭제'))
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
