import {
  deleteParticipant,
  getParticipantListByChannel,
} from "../api/participant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getChannelInfo } from "../api/channel";

import ChannelParticipant from "./ChannelParticipant";
// import { getChannelInfo } from "../api/channel";

import { Box } from "@mui/material";
import UpdateChannelInfoDialog from "./UpdateChannelInfoDialog";

function ChannelHome(props) {
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq); //33
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [channelInfo, setChannelInfo] = useState(undefined);
  const [open, setOpen] = useState(false);

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
    getChannelInfo(channelSeq, token, (response) => {
      setChannelInfo(response.data);
    });
  }, [channelSeq]);

  return (
    <div className="server-home">
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        채널정보수정
      </button>
      <UpdateChannelInfoDialog
        open={open}
        setOpen={(b) => {
          setOpen(b);
        }}
      ></UpdateChannelInfoDialog>
      <h2>서버홈</h2>
      <br />
      채널 이름 {channelName} {"("}#{channelSeq}
      {")"}
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
