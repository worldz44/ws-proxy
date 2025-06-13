const express = require("express");
const httpProxy = require("http-proxy");
const app = express();

const proxy = httpProxy.createProxyServer({
  target: process.env.PROXY_TARGET || "https://your-xray-server.com",
  changeOrigin: true,
  ws: true,
  secure: false,
  headers: {
    host: "m.youtube.com",
    "user-agent": "com.google.android.youtube/18.23.35"
  }
});

app.use("/", (req, res) => {
  proxy.web(req, res);
});

const server = app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
});

server.on("upgrade", function (req, socket, head) {
  proxy.ws(req, socket, head);
});
