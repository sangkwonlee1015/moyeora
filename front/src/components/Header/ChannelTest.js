import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";

//redux
import { useSelector, useDispatch } from "react-redux";
import { SET_PINLIST, setStomp } from "../../redux/PinList";
/// setStomp 이거 수정해야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default function ChannelTest() {
  //const user = useSelector((state) => state.UserInfo.userInfo.userName);
  const channelList = useSelector((state) => state.ChannelList.channelList);
  // const user = store.userReducer.user;
  // const channelList = user.userServer;

  const dispatch = useDispatch();

  const enterChannel = (id) => {
    console.log(id);
    const sock = new SockJs("http://localhost:8080/ws");
    const stomp = StompJs.over(sock);

    dispatch(setStomp(stomp));
    console.log(stomp);

    let pins = store.pinsReducer.pins;

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
          <li key={channel.channelId} className='header_items_2 headerSetting'>
            <Link
              to={`/serverpage/${channel.channelId}`}
              onClick={() => enterChannel(channel.channelId)}
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
