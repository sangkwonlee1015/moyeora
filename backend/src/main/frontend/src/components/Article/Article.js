import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelList } from "../../api/channel";

function Article() {
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
  return (
    <div className="article-search">
      <form onSubmit={onSubmitSearchForm}>
        <input type="text" value={channelName}></input>
        <button type="submit">검색</button>
      </form>
    </div>
  );
}

export default Article;
