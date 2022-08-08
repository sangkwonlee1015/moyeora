import { Link } from "react-router-dom";
import "./Sidebar.css";

function Map(props) {
  return (
    <div>
      <Link to={`/mappage/${props.channelSeq}`}>Map</Link>
    </div>
  );
}

export default Map;
