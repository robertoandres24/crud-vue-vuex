var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "content-type": "application/json" }
  /* other custom settings */
});

module.exports = axiosInstance;
