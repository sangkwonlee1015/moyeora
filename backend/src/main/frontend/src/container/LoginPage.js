import React, { useState } from "react";
import { registerUser, getUserProfile } from "../api/user";
import { doLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_TOKEN, SET_USERINFO } from "../redux/UserInfo";

const LoginPage = () => {
  //const navigate= useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const onSubmitRegisterForm = () => {
    const data = {
      userId: userId,
      userPassword: userPass,
    };
    registerUser(data, (response) => {
      console.log(response.data)
    },
    (error) => {
      console.log(error);
    })
  };
  const onSubmitLoginForm = (event) => {
    event.preventDefault();
    doLogin(
      { userId: userId, userPassword: userPass },
      (response) => {
        console.log(response.data);
        dispatch(SET_TOKEN(response.data.accessToken));
        getUserProfile(response.data.accessToken,
          (response) =>{
            dispatch(SET_USERINFO(response.data));
            console.log("profile get", response.data);
          },
          (error)=>{
            console.log(error);
          })
        dispatch(SET_LOGIN());
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={onSubmitLoginForm}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="UserID" className="sr-only">
              User ID
            </label>
            <input id="userid" value={userId} onChange={(e) => setUserId(e.target.value)} type="text"
              placeholder="Password"></input>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="userpass" value={userPass} onChange={(e)=> setUserPass(e.target.value)}
              type="text"
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
           로그인
          </button>
        </div>
      </form>

      <form onSubmit={onSubmitRegisterForm}>
        <input id="userid" value={userId} onChange={(e) => setUserId(e.target.value)}></input>
        <input
          id="userPassword"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
