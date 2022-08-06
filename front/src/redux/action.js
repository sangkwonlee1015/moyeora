export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setStomp = (stomp) => {
  return {
    type: "SET_STOMP",
    payload: stomp,
  };
};
