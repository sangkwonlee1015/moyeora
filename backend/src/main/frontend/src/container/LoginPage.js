import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  // Dispatch

  // Local state to control Modal Windows + Data fields
  const [mainVisible, setMainVisible] = useState(true);
  const [mainDirection, setMainDirection] = useState("left");
  const [createVisible, setCreateVisible] = useState(false);
  const [createDirection, setCreateDirection] = useState("left");
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginDirection, setLoginDirection] = useState("left");
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // const onLogin = (email, password) => {
  //   const data = {
  //     email,
  //     password,
  //   };
  //   axios.post('/api/v1/auth/login', data).then(response => {
  //     const { accessToken } = response.data;

  //     // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  //     // accessToken을 localStorage, cookie 등에 저장하지 않는다!

  //   }).catch(error => {
  //     // ... 에러 처리
  //     console.log("login requset fail : " + error);
  //   }).finally(()=>{console.log("login request end")});
  // }
  const onClickfunc = () => {
    console.log("login button click");
    navigate("/homepage");
  };

  return (
    <div>
      <input id="username"></input>
      <input id="userpass"></input>
      <button onClick={onClickfunc()}>Login</button>
    </div>
  );
};

export default LoginPage;
