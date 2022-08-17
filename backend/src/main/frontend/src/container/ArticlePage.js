import { useState } from "react";
import { useSelector } from "react-redux";
import { getChannelList } from "../api/channel";
import { registerParticipant } from "../api/participant";

function ArticlePage() {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const channelName = "";
  const [channellist, setChannellist] = useState(null);
  const onSubmitSearchForm = () => {
    getChannelList(
      channelName,
      null,
      token,
      (response) => {
        console.log(response.data);
        setChannellist(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onRegisterChannel = (channel) => {
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
  return (
    <div>
      <div className="article-search">
        <form onSubmit={onSubmitSearchForm}>
          <input type="text" value={channelName}></input>
          <button type="submit">검색</button>
        </form>
      </div>
      <ul className="article-list">
        {channellist.map((channel) => {
          <li
            key={channel.channelSeq}
            className="header_items_2 headerSetting2"
          >
            <button
              onclick={() => {
                onRegisterChannel(channel);
              }}
            >
              {channel.channelName}
            </button>
            {/* <Link
              to={`/serverpage/${channel.channelSeq}`}
              onClick={() => enterChannel(channel.channelSeq)}
            >
              {channel.channelName}
              <span class="tooltiptext">{channel.channelName}</span>
            </Link> */}
          </li>;
        })}
      </ul>
    </div>
  );

  // return(
  //     <div className="comp">
  //         <Header/>
  //         <div className="comp-ver">
  //             <Article/>
  //             <ArticleList/>
  //         </div>
  //     </div>
  // )
}

export default ArticlePage;
