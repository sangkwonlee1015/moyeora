import './header.css'
import HomePage from '../../container/Homepage'
import Intro from '../home/Home';
import React from 'react';
import ChannelHomePage from '../../container/ChannelHomePage';
import {Routes, Route,Link} from 'react-router-dom'

export default function header(){
    var homePng = require('../../assets/home.png');
    var addPng = require('../../assets/add.png');
    var findPng = require('../../assets/find.png');
    var settingPng = require('../../assets/setting.jpg');
    return (
        // 라우터 설정 home, channel들, 생성,  찾기,마이페이지
        <div className="container">
            <div className="item item1"><Link to="/homepage"><img src={homePng} alt='홈'/></Link></div>
            <div className="item item2"><Link to="/serverpage">서버</Link></div>
            <div className="item item3"><Link to="/addchannelpage"><img src={addPng} alt='방 추가'/></Link></div>
            <div className="item item4"><Link to="/articlepage"><img src={findPng} alt='방 찾기'/></Link></div>
            <div className="item item5"><Link to="/mypagesettingpage"><img src={settingPng} alt='마이 페이지'/></Link></div>
        </div>
    );
}