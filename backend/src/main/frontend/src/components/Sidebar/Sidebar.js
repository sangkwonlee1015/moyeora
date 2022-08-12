import { useSelector } from "react-redux";
import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css";
import { registerMap } from "../../api/map";
import UserInfo from "./UserInfo";

function Sidebar(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const mapList = useSelector((state) => state.MapList.mapList);
  
  const createMap = () => {
    const mapInfo = {
      "channelSeq": props.channelSeq,
      "mapName": "new map",
    }
    registerMap(
      mapInfo,
      token,
      (response) => (console.log('맵생성 성공')),
      (error) => (console.log('맵 생성 실패'))
      )
  }

  return (
    <div className="sidebar">
      <Chatting />
      <div className="mapListItem">MapList
        {mapList.map((map) => (
          <Map
            key={map.mapSeq}
            channelSeq={props.channelSeq}
            mapSeq={map.mapSeq}
            mapName={map.mapName}
          ></Map>
        ))}
        <button onClick={createMap}>+</button>
      </div>
      <Ov />
      <UserInfo
      channelSeq={props.channelSeq}/>
    </div>
  );
}
export default Sidebar;
