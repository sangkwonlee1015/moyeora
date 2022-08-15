
function ChannelHome (props){

  const channelSeq = props.channelSeq
  console.log(channelSeq, "--------------")

  return (
    <div className="server-home">
      <h2>서버홈</h2>
      <div>
        {channelSeq}

      </div>
    </div>
  )
}

export default ChannelHome