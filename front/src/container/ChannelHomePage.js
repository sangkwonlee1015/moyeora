import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import ChannelHome from "../components/ChannelHome"

function ChannelHomePage(){
    return (
        <div className="comp">
            <Header/>
            <Sidebar/>
            <ChannelHome/>
        </div>
    )
}

export default ChannelHomePage