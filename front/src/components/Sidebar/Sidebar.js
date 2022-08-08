import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Chatting />
      <Map channelSeq={props.channelSeq} />
      <Ov />
    </div>
  );
}
export default Sidebar;
