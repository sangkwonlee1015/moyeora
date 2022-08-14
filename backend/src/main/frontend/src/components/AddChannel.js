import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getChannelInfo, getChannelList } from "../api/channel";
import {
  getParticipantListByUser,
  registerParticipant,
} from "../api/participant";
import { SET_CHANNELLIST } from "../redux/ChannelList";

function AddChannel() {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [searchName, setSearchName] = useState("");
  const [channellistview, setChannellist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useeffect start channellistview", channellistview);
    getChannelList(
      searchName,
      "",
      token,
      (response) => {
        console.log(response.data);
        setChannellist(response.data.channelList);
        console.log("useeffect channellistview", channellistview);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  // useEffect(() => {
  //   getChannelList(
  //     searchName,
  //     null,
  //     token,
  //     (response) => {
  //       console.log(response.data);
  //       setChannellist(response.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, []);
  const onSubmitSearchForm = () => {
    console.log(token);
    console.log("searchName ", searchName);
    getChannelList(
      searchName,
      "",
      token,
      (response) => {
        console.log(response.data.channelList);
        setChannellist(response.data.channelList);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onRegisterChannel = (channel) => {
    console.log(channel);
    console.log(token);
    registerParticipant(
      channel,
      token,
      (response) => {
        let list = [];
        getParticipantListByUser(
          token,
          (response) => {
            dispatch(SET_CHANNELLIST(list))
            response.data.list.map((participant) => {
              console.log(participant);
              getChannelInfo(
                participant.participantsId.channelSeq,
                token,
                ({ data }) => {
                  let channel = {
                    channelSeq: participant.participantsId.channelSeq,
                    channelDesc: data.channelDesc,
                    channelName: data.channelName,
                    channelTag: data.channelTag,
                  };
                  list = list.concat(channel);
                  dispatch(SET_CHANNELLIST(list));
                  // setChannelList(list);
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
        console.log("채널 추가  ", response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };
  return (
    <div>
      <div className="article-search">
        <input
          type="text"
          value={searchName}
          onChange={onChangeSearchName}
        ></input>
        <button type="text" onClick={onSubmitSearchForm}>
          검색
        </button>
      </div>
      <ul className="header_items">
        {channellistview.map((channel) => (
          <li
            key={channel.channelSeq}
            className="header_items_2 headerSetting2"
          >
            <h2>{channel.channelName}</h2>
            <button
              onClick={() => {
                onRegisterChannel(channel);
              }}
            >
              {channel.channelName} 채널 들어가기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddChannel;
