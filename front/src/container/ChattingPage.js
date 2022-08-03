import Header from "../components/header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import ChattingArea from "../components/ChattingArea"

function ChattingPage(){
    return(
        <div className="comp">
            <Header/>
            <Sidebar/>
            <ChattingArea/>
        </div>
    )
}

export default ChattingPage