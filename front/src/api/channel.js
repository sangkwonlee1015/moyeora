import { instance, createHeaders } from "./index";

function registerChannel(channelInfo, token, success, error) {
  instance
    .post("/channel", channelInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getChannelList(channelName, channelTag, token, success, error) {
  instance
    .get(`/channel`, {
      params: { channelName: channelName, channelTag: channelTag },
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function updateChannel(channelInfo, token, success, error) {
  instance
    .patch(`/channel`, channelInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function deleteChannel(channelSeq, token, success, error) {
  instance
    .delete(`/participants/${channelSeq}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

export { registerChannel, getChannelList, updateChannel, deleteChannel };
