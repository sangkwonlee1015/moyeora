import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getUserNick } from "../api/user";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { deleteParticipantByLeader } from "../api/participant";
import { useSelector } from "react-redux";

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

function ChannelParticipant({ userSeq, leader }) {
  console.log(leader);
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const accessToken = useSelector((state) => state.UserInfo.accessToken);
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

  console.log(participantInfo, "--------------");

  return (
    <div>
      <div className="abc">
        <Item
          sx={{
            width: 250,
            height: "auto",
            color: "white",
            backgroundColor: "#202225",
            "&:hover": {
              backgroundColor: "#2f3136",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div>
            참여자 이름: {participantInfo.userName} <br />
            참여자 닉네임: {participantInfo.userNick}
          </div>
          {leader ? (
            <button
              onClick={() => {
                deleteParticipantByLeader(
                  channelSeq,
                  userSeq,
                  accessToken,
                  (response) => {
                    console.log(response.data);
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
