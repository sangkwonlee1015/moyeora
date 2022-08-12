import Header from "../components/Header/Header"
import MypageSideBar from "../components/MypageSidebar/MypageSidebar"
import MypageSetting from "../components/Mypage/MypageSetting"

function MypageSettingPage(){
    return (
        <div className="comp">
            <Header/>
            <MypageSideBar/>
            <MypageSetting/>
        </div>
    )
}

export default MypageSettingPage