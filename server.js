"use strict";
const http = require("http");
const path = require("path");
const os = require("os");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const updated_dir = path.join(__dirname, `images`, `testImage`);

const app = express();
const htttpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;
htttpServer.listen(PORT, () => {
  console.log(`Server is listenning on Port ${3000}`);
});

app.get("/", express.static(path.join(updated_dir, "./public")));

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: `${updated_dir}`,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);

        res.status(200).contentType("text/plain").end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);
