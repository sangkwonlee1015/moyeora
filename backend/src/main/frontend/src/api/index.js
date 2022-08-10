import axios from "axios";

const instance = axios.create({
  baseURL: "http://i7a407.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const createHeaders = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export { instance, createHeaders };
