import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getUserNick } from "../api/user";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { deleteParticipantByLeader } from "../api/participant";
import { useSelector } from "react-redux";
import { createHeaders } from "../api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ChannelParticipant({ userSeq, leader, stomp }) {
  console.log(leader);
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const accessToken = useSelector((state) => state.UserInfo.accessToken);
  const [participantInfo, setParticipantInfo] = useState({
    userName: "",
    userNick: "",
  });
  console.log(participantInfo);

  // useEffect(() => {
  //   stomp.connect({}, (e) => {});
  //   getChannelInfo(
  //     channelSeq,
  //     accessToken,
  //     (response) => {
  //       SET_CHANNELTOKEN(response.data.token);
  //       console.log("channelToken: " + response.data.token);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   return () => {
  //     stomp.disconnect(() => {});
  //   };
  // }, []);

  useEffect(() => {
    getUserNick(
      userSeq,
      (response) => {
        console.log(response);
        setParticipantInfo({
          userName: response.data.userName,
          userNick: response.data.userNick,
          userSeq: userSeq,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [userSeq]);

  console.log(participantInfo, "--------------");

  return (
    <div>
      <div className="abc">
        <Item
          sx={{
            width: 200,
            height: "auto",
            color: "#455874",
            margin: "3px",
            backgroundColor: "#94dadd",
          }}
        >
          <div style={{ color: "black", fontWeight: "600" }}>
            이름: {participantInfo.userName} <br />
            닉네임: {participantInfo.userNick}
          </div>
          {leader ? (
            <button
              className="kickBotton"
              onClick={() => {
                deleteParticipantByLeader(
                  channelSeq,
                  userSeq,
                  accessToken,
                  (response) => {
                    console.log(response.data);
                    if (stomp) {
                      let chatMessage = {
                        receiver: channelSeq,
                        targetUserSeq: participantInfo.userSeq,
                        status: "KICKOUT_CHANNEL",
                      };
                      stomp.send(
                        "/app/private-message",
                        createHeaders(accessToken),
                        JSON.stringify(chatMessage)
                      );
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }}
            >
              강퇴하기
            </button>
          ) : null}
        </Item>
      </div>
    </div>
  );
}

export default ChannelParticipant;
