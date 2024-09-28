import axios from "axios";

const instance = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NiIsIkhldEhhblN0cmluZyI6IjIyLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTI4MDAwMDAwMCIsIm5iZiI6MTcxNzA4ODQwMCwiZXhwIjoxNzQ1NDI3NjAwfQ.a2GNW-Uz9iEgJEYu556bmpJxt1RW5ypggQazVphPdc4",
  },
});

// interceptors

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  return config;
});

export default instance;
