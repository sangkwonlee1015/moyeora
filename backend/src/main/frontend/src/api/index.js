import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://i7a407.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const createHeaders = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export { instance, createHeaders };
