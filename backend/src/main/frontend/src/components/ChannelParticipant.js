import { useEffect, useState } from "react";



function ChannelParticipant(props){
  console.log(props, "props 받음")
  // const userName = props.userName;
  // const userNick = props.userNick;

  const [userName, setUserName] = useState("")
  const [userNick, setUserNick] = useState("")
  
  useEffect(() => {
    setUserName(props.userName);
    setUserNick(props.userNick);
  },[])

  return (
      <div>
        <div>참여자 이름 {userName}</div>
        <div>참여자 닉네임 {userNick}</div>
      </div>
  )
}

export default ChannelParticipant