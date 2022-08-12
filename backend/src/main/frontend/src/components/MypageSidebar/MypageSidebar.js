import Map from "./Map";
import "./MypageSidebar.css";


function MypageSideBar(props){
  return (
    <div className="mypage-sidebar">마이페이지 사이드바 입니다.
    
      <div className="mypage-sidebar">
        <Map channelSeq={props.channelSeq} />
      </div>
    
    </div>

  )
}

export default MypageSideBar



