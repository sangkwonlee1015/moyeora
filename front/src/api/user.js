import { instance, createHeaders } from "./index";

function registerUser(userInfo, success, error) {
  instance.post(`/users`, userInfo, {}).then(success).catch(error);
}

function checkDuplicatedUserId(userId, success, error) {
  instance.get(`/users/${userId}`, {}).then(success).catch(error);
}

function findUserId(findUserInfo, success, error) {
  instance
    .post(`/users/find/userid`, findUserInfo, {})
    .then(success)
    .catch(error);
}

function getUserProfile(token, success, error) {
  instance
    .get(`/users/profile`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function updateUser(updateUserInfo, token, success, error) {
  instance
    .patch(`/users`, updateUserInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function updateUserPassword(updateUserPasswordInfo, token, success, error) {
  instance
    .patch(`/users/password`, updateUserPasswordInfo, {
      header: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

// back에서 수정 필요
function deleteUser(userSeq, token, success, error) {
  instance
    .delete(`/users/${userSeq}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

// 비밀번호를 잊은 사람이 변경 가능한 API 추가 필요
export {
  registerUser,
  checkDuplicatedUserId,
  findUserId,
  getUserProfile,
  updateUser,
  updateUserPassword,
  deleteUser,
};
