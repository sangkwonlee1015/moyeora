import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { getParticipantListByUser } from "../../api/participant";

//redux
import { useSelector, useDispatch } from "react-redux";
import { ADD_PIN, SET_PIN, SET_PINLIST } from "../../redux/PinList";
import { SET_STOMP } from "../../redux/ChannelList";
import { SET_CHANNELLIST } from "../../redux/ChannelList";
import { getChannelInfo } from "../../api/channel";
/// setStomp 이거 수정해야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default function ChannelTest() {
  const dispatch = useDispatch();
  const [channelList, setChannelList] = useState([]);
  const token = useSelector((state) => state.UserInfo.accessToken);
  const pins = useSelector((state) => state.PinList.pinList);

  useEffect(() => {
    let list = [];
    getParticipantListByUser(
      token,
      (response) => {
        response.data.list.map((participant) => {
          getChannelInfo(
            participant.participantsId.channelSeq,
            ({ data }) => {
              let channel = {
                channelSeq: participant.participantsId.channelSeq,
                channelDesc: data.channelDesc,
                channelName: data.channelName,
                channelTag: data.channelTag,
              };
              list = list.concat(channel);
              dispatch(SET_CHANNELLIST(list));
              setChannelList(list);
            },
            (error) => {
              console.log("error", error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  console.log("pins : ", pins);

  function enterChannel(id) {
    console.log(id);
    const sock = new SockJs("http://localhost:8080/ws");
    const stomp = StompJs.over(sock);

    // dispatch(SET_STOMP(stomp));
    // console.log("stomp : ", stomp);

    console.log("pins 1 : ", pins);
    stomp.connect({}, (e) => {
      console.log("pins 2 : ", pins);
      stomp.subscribe("/user/" + id + "/private", (data) => {
        console.log("pins 3 : ", pins);
        const message = JSON.parse(data.body);
        switch (message.status) {
          case "ADDPIN":
            const newPins = {
              seq: message.pinSeq,
              lat: Number(message.lat),
              lng: Number(message.lng),
              color: message.pinColor,
              comment: message.pinContent,
              isVisible: false,
            };
            console.log("newPins : ", newPins);
            dispatch(ADD_PIN(newPins));
            console.log("pins 4 : ", pins);
            break;
          case "MODPIN":
            dispatch(
              SET_PIN({
                pinSeq: message.pinSeq,
                pinColor: message.pinColor,
                pinContent: message.pinContent,
              })
            );
            // pins.map((pin, index) => {
            //   console.log("pin : ", pin);
            //   if (pin.seq == message.pinSeq) {
            //     console.log("pin : ", pin);
            //     let newPin = { ...pin };
            //     newPin.color = message.pinColor;
            //     newPin.comment = message.pinContent;
            //     dispatch(SET_PIN({ index: index, newPin: newPin }));
            //   }
            // });
            console.log(pins);
            break;
          default:
        }
      });
    });
  }

  return (
    <>
      <ul className="header_items">
        {channelList.map((channel) => (
          <li key={channel.channelSeq} className="header_items_2 headerSetting2">
            <Link
              to={`/serverpage/${channel.channelSeq}`}
              onClick={() => enterChannel(channel.channelSeq)}
            >
              {channel.channelName}
              <span class="tooltiptext">{channel.channelName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
