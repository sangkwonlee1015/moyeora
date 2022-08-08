import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { getParticipantListByUser } from "../../api/participant";

//redux
import { useSelector, useDispatch } from "react-redux";
import { SET_PINLIST } from "../../redux/PinList";
import { SET_STOMP } from "../../redux/ChannelList";
import { SET_CHANNELLIST } from "../../redux/ChannelList";
import { getChannelInfo } from "../../api/channel";
/// setStomp 이거 수정해야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default function ChannelTest() {
  const dispatch = useDispatch();
  const [channelList, setChannelList] = useState([]);
  const token = useSelector((state) => state.UserInfo.accessToken);
  const store = useSelector((state) => state);

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

  const enterChannel = (id) => {
    console.log(id);
    const sock = new SockJs("http://localhost:8080/ws");
    const stomp = StompJs.over(sock);

    dispatch(SET_STOMP(stomp));
    console.log("stomp : ", stomp);

    let pins = store.PinList.pinList;
    console.log("pins : ", pins);

    stomp.connect({}, (e) => {
      stomp.subscribe("/user/" + id + "/private", (data) => {
        const message = JSON.parse(data.body);
        switch (message.status) {
          case "ADDPIN":
            pins = [
              ...pins,
              {
                seq: message.pinSeq,
                lat: Number(message.lat),
                lng: Number(message.lng),
                color: message.pinColor,
                comment: message.pinContent,
                isVisible: false,
              },
            ];
            dispatch(SET_PINLIST(pins));
            break;
          case "MODPIN":
            pins.map((pin) => {
              if (pin.seq == message.pinSeq) {
                pin.color = message.pinColor;
                pin.comment = message.pinContent;
              }
            });
            dispatch(SET_PINLIST(pins));
            break;
          default:
        }
      });
    });
  };

  return (
    <>
      <ul className="header_items">
        {channelList.map((channel) => (
          <li key={channel.channelSeq} className="header_items_2 headerSetting">
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
