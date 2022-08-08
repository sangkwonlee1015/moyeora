import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MapArea from "../components/MapArea";
import MapMarkerList from "../components/MapMarkerList";
import { useParams } from "react-router-dom";

function MapPage() {
  return (
    <div className="comp mappage">
      <Header />
      <Sidebar />
      <div className="comp">
        <MapArea channelSeq={useParams().channelSeq} />
        <MapMarkerList />
      </div>
    </div>
  );
}

export default MapPage;
