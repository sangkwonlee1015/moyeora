import { useSelector } from "react-redux";
import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css";
import UserInfo from "./UserInfo";

function Sidebar(props) {
  const mapList = useSelector((state) => state.MapList.mapList);

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
      </div>
      <Ov />
      <UserInfo
      channelSeq={props.channelSeq}/>
    </div>
  );
}
export default Sidebar;
