import MypageSideBar from "../components/Sidebar/MypageSidebar"
import MypageSeting from "../components/Mypage/MypageSetting"
import Header from "../components/header/Header"

function MypageSetingPage(){
    return (
        <div className="comp">
            <Header/>
            <MypageSideBar/>
            <MypageSeting/>
        </div>
    )
}

export default MypageSetingPage