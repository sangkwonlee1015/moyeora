import { instance, createHeaders } from "./index";

function registerPin(pinInfo, token, success, error) {
  instance
    .post(`/pin`, pinInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function updatePin(updatePinInfo, token, success, error) {
  instance
    .patch(`/pin`, updatePinInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function deletePin(pinSeq, token, success, error) {
  instance
    .delete(`/pin`, {
      headers: createHeaders(token),
      params: { pinSeq: pinSeq },
    })
    .then(success)
    .catch(error);
}

function getPinList(mapSeq, token, success, error) {
  instance
    .get(`/pin`, { headers: createHeaders(token), params: { mapSeq: mapSeq } })
    .then(success)
    .catch(error);
}

export { registerPin, updatePin, deletePin, getPinList };
