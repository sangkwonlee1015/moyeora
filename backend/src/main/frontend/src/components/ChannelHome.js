import { deleteParticipant, getParticipantListByChannel } from "../api/participant"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserNick } from "../api/user";
import ChannelParticipant from "./ChannelParticipant";


function ChannelHome (props){
  
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq)  //33
  const token = useSelector((state) => state.UserInfo.accessToken);
  
  const [participantsList, setParticipantsList] = useState([])
  const [participantsInfoList, setParticipantsInfoList] = useState([])

  useEffect(() => {
    const success = (res) => {
      console.log("유즈이펙트 성공: 현재 채널 참여자 목록", res.data.list) // 현재 채널 참여자 목록
      const list = []
      const aList = []
      res.data.list.map((res) => {
        console.log("list test ", res.participantsId.userSeq);  // 15, 16, 17, 18
        list.push(res.participantsId.userSeq)  // list = [15, 16, 17, 18]

        let success1 = (response) => {
          console.log("success1", response.data.userParticipantsRes) // {userName: '12345', userNick: '12345'} <-15
          aList.push(response.data.userParticipantsRes)
        }
        let error1 = (response) => {
          console.log("error1", response)
        }
        getUserNick(res.participantsId.userSeq, success1, error1)
      })
      
      
      setParticipantsList(list)
      
      console.log("aList", aList)
      console.log("list", list)
      setParticipantsInfoList(aList);  

    }

    const error = (res) => {
      console.log("유즈이펙트 실패", res)
    }
    getParticipantListByChannel(channelSeq, token, success, error)
  }, [channelSeq])

  console.log(participantsInfoList, "++++++++++++++")



  return (
    <div className="server-home">
      <h2>서버홈</h2>
      <div>
        채널Seq: {channelSeq}
        <br/>
        현재 채널 참여자 목록: {participantsList}
        <br/>
        현재 채널 참여자 정보: {participantsInfoList}
      </div>

        {participantsInfoList.map((res) => (
          <ChannelParticipant
            userName={res.userName}
            userNick={res.userNick}
          ></ChannelParticipant>
        ))}


    </div>
  )
}

export default ChannelHome