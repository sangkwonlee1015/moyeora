import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getUserNick } from "../api/user";

function ChannelParticipant({ userSeq }) {
  const [participantInfo, setParticipantInfo] = useState({
    userName: "",
    userNick: "",
  });
  console.log(participantInfo);

  useEffect(() => {
    getUserNick(
      userSeq,
      (response) => {
        console.log(response);
        setParticipantInfo({
          userName: response.data.userName,
          userNick: response.data.userNick,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [userSeq]);

  return (
    <div>
      {/* <Box> */}
        <div>참여자 이름 {participantInfo.userName}</div>
        <div>참여자 닉네임 {participantInfo.userNick}</div>
      {/* </Box> */}
    </div>
  );
}

export default ChannelParticipant;
