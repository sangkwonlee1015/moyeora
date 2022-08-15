import React, { useState } from "react";
import { registerUser, getUserProfile } from "../api/user";
import { doLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_TOKEN, SET_USERINFO } from "../redux/UserInfo";
import { getParticipantListByUser } from "../api/participant";
import { getChannelInfo } from "../api/channel";
import { SET_CHANNELLIST } from "../redux/ChannelList";
import "./LoginSignup.css";
import FindPassword from "../components/FindPassword";
import FindUserId from "../components/FindUserId";


const LoginPage = () => {
  //const navigate= useNavigate();
  const dispatch = useDispatch();
  const [IsSignUp, setIsSignUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const LoginOrSignUp = (e) => {        // 로그인 창 -> 회원가입 창 왔다갔다.
    e.preventDefault()                  // form 제출 막고
    setUserId("")                       // id, password 입력하던거 초기화
    setUserPass("")
    setUserName("")
    setUserNick("")
    setUserPhone("")
    const newValue = !IsSignUp          
    setIsSignUp(newValue)               // true -> false 변경
  }

  const onSubmitRegisterForm = (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      userPassword: userPass,
      userName: userName,
      userNick: userNick,
      userPhone: userPhone
    };
    registerUser(
      data,
      (response) => {
        setUserId("");                        // id, password 입력하던거 초기화
        setUserPass("");
        setUserName("");
        setUserNick("");
        setUserPhone("");
        setIsSignUp(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onSubmitLoginForm = (event) => {
    event.preventDefault();
    doLogin(
      { userId: userId, userPassword: userPass },
      (response) => {
        console.log(response.data);
        dispatch(SET_TOKEN(response.data.accessToken));
        let token = response.data.accessToken;
        getUserProfile(
          response.data.accessToken,
          (response) => {
            dispatch(SET_USERINFO(response.data.userRes));
            console.log("profile get", response.data.userRes);
            let list = [];
            getParticipantListByUser(
              token,
              (response) => {
                dispatch(SET_CHANNELLIST(list))
                response.data.list.map((participant) => {
                  console.log(participant);
                  getChannelInfo(
                    participant.participantsId.channelSeq,
                    token,
                    ({ data }) => {
                      let channel = {
                        channelSeq: participant.participantsId.channelSeq,
                        channelDesc: data.channelDesc,
                        channelName: data.channelName,
                        channelTag: data.channelTag,
                      };
                      list = list.concat(channel);
                      dispatch(SET_CHANNELLIST(list));
                    },
                    (error) => {
                      console.log("error", error);
                    }
                  );
                });
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
        dispatch(SET_LOGIN());
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className="LoginSignUp">
      { IsSignUp ? 
      <div class="center">
        <h1>SignUp</h1>
        <form method="post" onSubmit={onSubmitRegisterForm}>
          <div class="txt_field">
            <input 
            type="text" 
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            ></input>
            <span></span>
            <label>User ID</label>
          </div>
          <div class="txt_field">
            <input 
            type="password" 
            required
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            ></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="txt_field">
            <input 
            type="text" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            ></input>
            <span></span>
            <label>YourName</label>
          </div>
          <div class="txt_field">
            <input 
            type="text" 
            value={userNick}
            onChange={(e) => setUserNick(e.target.value)}
            ></input>
            <span></span>
            <label>NickName</label>
          </div>
          <div class="txt_field">
            <input 
            type="text" 
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            ></input>
            <span></span>
            <label>PhoneNumber</label>
          </div>
          <input type="submit" value="SignUp"></input>
          <div class="signup_link">
            already a member? <button onClick={LoginOrSignUp}>Login</button>
          </div>
        </form>
      </div>
      :
      <div class="center">
        <h1>Login</h1>
        <form method="post" onSubmit={onSubmitLoginForm}>
          <div class="txt_field">
            <input 
            type="text" 
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            // placeholder="Password"
            ></input>
            <span></span>
            <label>User ID</label>
          </div>
          <div class="txt_field">
            <input 
            type="password" 
            required
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            ></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass">Forgot Password?</div>
          <FindPassword></FindPassword>
          <FindUserId></FindUserId>
          <input type="submit" value="Login"></input>
          <div class="signup_link">
            Not a member? <button onClick={LoginOrSignUp}>Signup</button>
          </div>
        </form>
      </div>
      }
      
    </div>
  );
};

export default LoginPage;
