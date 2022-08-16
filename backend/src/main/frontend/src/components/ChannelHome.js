import {
  deleteParticipant,
  getParticipantListByChannel,
} from "../api/participant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ChannelParticipant from "./ChannelParticipant";
import { getChannelInfo } from "../api/channel";

function ChannelHome(props) {
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq); //33
  const token = useSelector((state) => state.UserInfo.accessToken);

  const [pList, setPList] = useState([]);
  // const [channelInfo, setChannelInfo] = useState([객체배열 포맷]);

  const [channelDesc, setChannelDesc] = useState();
  const [channelName, setChannelName] = useState();
  const [channelTag, setChannelTag] = useState();


  console.log(pList);

  useEffect(() => {
    getParticipantListByChannel(
      channelSeq,
      token,
      (response) => {
        setPList(response.data.list);
      },
      (error) => {
        console.log(error);
      }
    );

    getChannelInfo(
      channelSeq,
      token,
      (response) => {
        console.log("채널정보 불러오기 성공", response.data)
        // setChannelInfo(response.data)
        setChannelDesc(response.data.channelDesc)
        setChannelName(response.data.channelName)
        setChannelTag(response.data.channelTag)
      },
      (error) => {
        console.log("채널정보 불러오기 에러", error)
      }

    )

  }, [channelSeq]);

  return (
    <div className="server-home">
      <h2>서버홈</h2>

      <br />
      채널 이름 {channelName} {'('}#{channelSeq}{')'}
      <br />
      채널 설명 {channelDesc}
      <br />
      채널 태그 {channelTag}

      <br />
      <br />
      <br />


      <div>
        <br />
        현재 채널 참여자 목록:{" "}
        {pList.map((item, index) => {
          return (
            <ChannelParticipant
              key={index}
              userSeq={item.participantsId.userSeq}
            ></ChannelParticipant>
          );
        })}

      </div>
    </div>
  );
}

export default ChannelHome;
