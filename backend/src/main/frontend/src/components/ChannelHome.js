import {
  deleteParticipant,
  getParticipantListByChannel,
} from "../api/participant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getChannelInfo } from "../api/channel";

import ChannelParticipant from "./ChannelParticipant";

import { Box } from "@mui/material";

function ChannelHome(props) {
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq); //33
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [channelInfo, setChannelInfo] = useState(undefined);

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
    getChannelInfo(channelSeq, token, (response) => {
      setChannelInfo(response.data);
    });
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
        {channelInfo ? (
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={"data:image;base64, " + channelInfo.channelImageId}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ChannelHome;
