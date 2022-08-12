import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPinList } from "../../api/pin";
import { SET_CURRENTMAP } from "../../redux/PinList";
import { SET_PINLIST } from "../../redux/PinList";
import "./Sidebar.css";

function Map(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const dispatch = useDispatch();

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
  return (
    <div>
      <Link
        to={`/mappage/${props.channelSeq}/${props.mapSeq}`}
        onClick={() => {
          openMap(props.mapSeq);
        }}
      >
        {props.mapName}
      </Link>
    </div>
  );
}

export default Map;
