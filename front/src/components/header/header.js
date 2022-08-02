import './header.css'

export default function header(){
    return (
        // 라우터 설정 home, channel들, 생성,  찾기,마이페이지
        <div className="container">
            <div className="item item1">홈</div>
            <div className="item item2">서버</div>
            <div className="item item3">방 만들기</div>
            <div className="item item4">방 찾기</div>
            <div className="item item5">마이 페이지</div>
        </div>
    );
}