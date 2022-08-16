import {
  deleteParticipant,
  getParticipantListByChannel,
} from "../api/participant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ChannelParticipant from "./ChannelParticipant";

function ChannelHome(props) {
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq); //33
  const token = useSelector((state) => state.UserInfo.accessToken);

  const [pList, setPList] = useState([]);

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
  }, [channelSeq]);

  return (
    <div className="server-home">
      <h2>서버홈</h2>
      <div>
        채널Seq: {channelSeq}
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
        <br />
        {/* 현재 채널 참여자 정보: */}
      </div>
    </div>
  );
}

export default ChannelHome;
