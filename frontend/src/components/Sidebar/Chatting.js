import {Link} from 'react-router-dom'
import "./Sidebar.css"

function Chatting(){
  return (
    <div className="chatting-bar"><Link to="/chattingpage">Chatting</Link></div>
  )
}

export default Chatting