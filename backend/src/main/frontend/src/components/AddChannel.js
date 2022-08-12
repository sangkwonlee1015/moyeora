import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChannelList } from "../api/channel";
import { registerParticipant } from "../api/participant";

function AddChannel() {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [searchName, setSearchName] = useState("");
  const [channellistview, setChannellist] = useState([]);

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
