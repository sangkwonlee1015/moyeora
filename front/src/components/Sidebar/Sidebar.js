import Chatting from "./Chatting";
import Map from "./Map";
import Ov from "./OV";
import "./Sidebar.css"

function Sidebar (){
  return (
    <div className="sidebar">
      <Chatting/>
      <Map/>
      <Ov/>
    </div>
  )
}
export default Sidebar 