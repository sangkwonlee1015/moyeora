import './Header.css'
import {Link} from 'react-router-dom'

// react-icon
import { FaHome, FaPlus, FaSearch, FaCog } from "react-icons/fa";

import ChannelTest from './ChannelTest'

export default function Header(){
    var homePng = require('../../assets/home.png');
    var addPng = require('../../assets/add.png');
    var findPng = require('../../assets/find.png');
    var settingPng = require('../../assets/setting.jpg');
    return (
        // 라우터 설정 home, channel들, 생성,  찾기,마이페이지
        <div className="container">
            <div className="header_items"><Link to="/homepage"><FaHome size="20" color="7f8694"/></Link></div>
            <ChannelTest/>
            <div className="header_items"><Link to="/b"><FaPlus size="20" color="7f8694"/></Link></div>
            <div className="header_items"><Link to="/c"><FaSearch size="20" color="7f8694"/></Link></div>
            <div className="header_items"><Link to="/d"><FaCog size="20" color="7f8694"/></Link></div>
        </div>
    );
}
