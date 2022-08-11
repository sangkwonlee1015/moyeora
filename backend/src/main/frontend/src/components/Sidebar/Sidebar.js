import { useSelector } from "react-redux";
import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css";

function Sidebar(props) {
  const mapList = useSelector((state) => state.MapList.mapList);
  return (
    <div className="sidebar">
      <Chatting />
      {mapList.map((map) => (
        <Map
          key={map.mapSeq}
          channelSeq={props.channelSeq}
          mapSeq={map.mapSeq}
          mapName={map.mapName}
        ></Map>
      ))}
      <Ov />
    </div>
  );
}
export default Sidebar;
