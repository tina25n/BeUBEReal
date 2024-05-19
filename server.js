"use strict";
const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const updated_dir = path.join(__dirname, `uploads`, `testImage`);

// Check that the actual directory exists or make one if it does not
try {
  if (!fs.existsSync(updated_dir)) {
    fs.mkdirSync(updated_dir, { recursive: true });
  }
} catch (err) {
  console.error("Error creating upload directory:", err);
  process.exit(1); // Exit the process if directory creation fails
}

// Setup the application logic in express
const app = express();
app.use("/", express.static(path.join(__dirname, "public")));
console.log("Made it by the express_static call");

const handleError = (err, res, message = "Oops! Something went wrong!") => {
  console.error(err);
  res.status(500).contentType("text/plain").end(message);
};

const upload = multer({
  dest: `${path.join(__dirname, "temp_dir")}`,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    if (!req.file) {
      return res.status(400).contentType("text/plain").end("No file uploaded!");
    }

    const tempPath = req.file.path;
    const targetPath = path.join(updated_dir, "image.png");
    console.log(`The target path is ${targetPath}`);

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

// Generic error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
    process.exit(1); // Exit the process if the server fails to start
  }
  console.log(`Server is listening on Port ${PORT}`);
});
