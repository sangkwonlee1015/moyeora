import Header from "../components/header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import MapArea from "../components/MapArea"
import MapMarkerList from "../components/MapMarkerList"
import OvArea from "../components/OvArea"
function OvPage(){
    return (
        <div className="comp">
            <Header/>
            <div className="comp-ver">
                <div className="comp mappage">
                    <Sidebar/>
                    <MapArea/>
                    <MapMarkerList/>
                </div>
                <OvArea/>
            </div>
        </div>
    )
}

export default OvPage