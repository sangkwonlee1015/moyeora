import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import MapArea from "../components/MapArea"
import MapMarkerList from "../components/MapMarkerList"
import OvArea from "../components/OvArea"
function OvPage(){
    return (
        <div className="comp">
            <Header/>
            <Sidebar/>
            <div className="comp-ver">
                <div className="comp mappage">
                    <MapArea/>
                    <MapMarkerList/>
                </div>
                <OvArea/>
            </div>
        </div>
    )
}

export default OvPage