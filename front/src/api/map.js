import { instance, createHeaders } from "./index";

function registerMap(mapInfo, token, success, error) {
  instance
    .post(`/maps`, mapInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getMapList(Seq, type, token, success, error) {
  instance
    .get(`/maps/${Seq}`, {
      headers: createHeaders(token),
      params: { type: type },
    })
    .then(success)
    .catch(error);
}

function updateMap(updateMapInfo, token, success, error) {
  instance
    .patch(`/maps`, updateMapInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function deleteMap(mapSeq, token, success, error) {
  instance
    .delete(`/maps/${mapSeq}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

export { registerMap, getMapList, updateMap, deleteMap };
