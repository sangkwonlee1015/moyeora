import { useSelector } from "react-redux";
import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css";
import { getMapList, registerMap } from "../../api/map";
import UserInfo from "./UserInfo";
import { useEffect } from "react";
import { SET_MAPLIST } from "../../redux/MapList";
import { useDispatch } from "react-redux";

function Sidebar(props) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const mapList = useSelector((state) => state.MapList.mapList);
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const dispatch = useDispatch();
  
  
  const createMap = () => {
    const mapInfo = {
      "channelSeq": props.channelSeq,
      "mapName": "new map",
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
        <button onClick={createMap}>+</button>
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
