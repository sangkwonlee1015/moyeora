import { instance, createHeaders } from "./index";

function registerParticipant(participantInfo, token, success, error) {
  instance
    .post("/participants", participantInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getParticipantListByUser(token, success, error) {
  instance
    .get(`/participants/byUser`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getParticipantListByChannel(channelSeq, token, success, error) {
  instance
    .get(`/participants/byChannel/${channelSeq}`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function deleteParticipant(channelSeq, token, success, error) {
  instance
    .delete(`/participants/${channelSeq}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function deleteParticipantByLeader(channelSeq, userSeq, token, success, error) {
  instance
    .delete(`/participants/${channelSeq}/${userSeq}`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

export {
  registerParticipant,
  getParticipantListByUser,
  getParticipantListByChannel,
  deleteParticipant,
  deleteParticipantByLeader,
};
