"use strict";
const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const htttpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;
htttpServer.listen(PORT, () => {
  console.log(`Server is listenning on Port ${3000}`);
});
app.get("/", express.static(path.join(__dirname, "./public")));
