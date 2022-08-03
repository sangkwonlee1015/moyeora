import Header from "../components/header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import MapArea from "../components/MapArea"
import MapMarkerList from "../components/MapMarkerList"

function MapPage(){
    return (
        <div className="comp mappage">
            <Header/>
            <Sidebar/>
            <MapArea/>
            <MapMarkerList/>
        </div>
    )
}

export default MapPage