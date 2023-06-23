const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = socketIo(server);
const clients = {};

io.on('connection', (socket) => {
  console.log(`Client connected ${socket.id}`);
//   console.log(socket);

  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    clients[data] = socket;
  });

  socket.on("image", (data) => {
    console.log(data.filename);
    const imagePath = path.join(__dirname, "images", data.filename);

    const imageBuffer = Buffer.from(data.data, "base64");

    fs.writeFile(imagePath, imageBuffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return;
      }
      console.log("Image saved:", data.filename);
      setTimeout(() => {}, 1000);
      socket.emit("imageReceived", {
        message: "Image received and saved successfully",
        filename: data.filename,
        imagePath: imagePath,
      });
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/take_picture/:deviceId', (req, res) => {
  const deviceId = req.params.deviceId;
  const socket = clients[deviceId];
  message = { "app":"Web Socket", "action": "Take picture",
            "data":{}}
  message = JSON.stringify(message);
  console.log(message)

  if (socket) {
    socket.send(message);
  } else {
      console.log('No socket found for user');
  }
  res.sendStatus(200);
});

app.get('/api/filter/:deviceId/:filterId', (req, res) => {
  const deviceId = req.params.deviceId;
  const filterId = req.params.filterId;
  const socket = clients[deviceId];
  message = { "app":"Web Socket", "action": "Update filter",
            "data":{"filterId": filterId}}
  message = JSON.stringify(message);
  console.log(message)

  if (socket) {
    socket.send(message);
  } else {
      console.log('No socket found for user');
  }
  res.sendStatus(200);
});

// download image from image folder with filename
app.get('/api/images/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  res.sendFile(path.join(__dirname, 'images', fileName));
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
