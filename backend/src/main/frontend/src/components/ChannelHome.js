import { deleteParticipant, getParticipantListByChannel } from "../api/participant"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


function ChannelHome (props){
  
  const channelSeq = props.channelSeq
  const token = useSelector((state) => state.UserInfo.accessToken);
  
  const [participantsList, setParticipantsList] = useState([])
  
  
  useEffect(() => {
    const success = (res) => {
      console.log("유즈이펙트 성공: 현재 채널 참여자 목록", res.data.list)// 현재 채널 참여자 목록"
      // setParticipantsList(list)
      const list = []
      res.data.list.map((res) => {
        console.log("list test ",res.participantsId.userSeq);
        list.push(res.participantsId.userSeq)
        })
      console.log(list)
      setParticipantsList(list)

      // for (const item of participantsList) {
        // console.log(item);
        // const participantSeq = item.participantsId.userSeq  // 현재 채널 참여자 1명
        // console.log(participantSeq)
        // deleteParticipant(item.participantsId.channelSeq, token, success1, error1)
      // }
    }
    const error = (res) => {
      console.log("유즈이펙트 실패", res)
    }
    console.log(channelSeq, "현재 채널--------------")
    getParticipantListByChannel(channelSeq, token, success, error)
  }, [])



  return (
    <div className="server-home">
      <h2>서버홈</h2>
      <div>
        채널Seq: {channelSeq}
        <br/>
        현재 채널 참여자 목록: {participantsList}
      </div>
    </div>
  )
}

export default ChannelHome