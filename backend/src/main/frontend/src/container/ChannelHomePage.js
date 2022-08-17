import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ChannelHome from "../components/ChannelHome";
import { useParams } from "react-router-dom";

function ChannelHomePage() {
  return (
    <div className="comp">
      <Header />
      <Sidebar channelSeq={useParams().serverid} />
      <ChannelHome channelSeq={useParams().serverid}/>
    </div>
  );
}

export default ChannelHomePage;
