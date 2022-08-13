import "./Mypage.css";
import { CLICK_PIN, SET_PIN } from "../../redux/PinList";
import React, { useEffect, useState } from "react";
// mui
import Button from '@mui/material/Button';

// redux
import { useSelector } from "react-redux";
import UserInfo, { SET_USERINFO } from "../../redux/UserInfo";
import { useDispatch } from "react-redux";
import { stringify } from "uuid";
import { updateUser, updateUserPassword } from "../../api/user";



function MypageSetting(){
  const token = useSelector((state) => state.UserInfo.accessToken);
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  // const userName = userInfo.userName
  // const userNick = userInfo.userNick
  // const userPhone = userInfo.userPhone


  // const [newUserName, setNewUserName] = React.useState(userName);
  // const [newUserNick, setNewUserNick] = React.useState(userNick);
  // const [newUserPhone, setNewUserPhone] = React.useState(userPhone);

  // const [currentPassword, setCurrentPassword] = React.useState();
  // const [newPassword, setNewPassword] = React.useState();
  
    return (
      
        <div className="mypage-setting"> 마이 페이지 유저 정보 수정 페이지 입니다.</div>
    )
}

export default MypageSetting