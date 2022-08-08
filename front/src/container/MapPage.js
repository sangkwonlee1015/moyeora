import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import MapArea from "../components/MapArea"
import MapMarkerList from "../components/MapMarkerList"

function MapPage(){
    return (
      <div className="comp mappage">
          <Header/>
          <Sidebar/>
          <div className="comp">
            <MapArea/>
            <MapMarkerList/>
          </div>
      </div>
    )
}

export default MapPage