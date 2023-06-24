const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);
const clients = {};

io.on('connection', (socket) => {
  console.log(`Client connected ${socket.id}`);

  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    clients[data] = socket;
  });

  socket.on('image', (data) => {
    console.log(data.filename);
    const imagePath = path.join('images', data.filename);

    const imageBuffer = Buffer.from(data.data, 'base64');

    fs.writeFile(imagePath, imageBuffer, (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return;
      }
      console.log('Image saved:', data.filename);
      setTimeout(() => {}, 1000);
      socket.emit('imageReceived', {
        message: 'Image received and saved successfully',
        filename: data.filename,
        imagePath: imagePath,
      });
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});

//API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/take_picture/:deviceId', (req, res) => {
  const deviceId = req.params.deviceId;
  const socket = clients[deviceId];
  const message = {
    app: 'Web Socket',
    action: 'Take picture',
    data: {},
  };
  const jsonMessage = JSON.stringify(message);
  console.log(jsonMessage);

  if (socket) {
    socket.send(jsonMessage);
  } else {
    console.log('No socket found for user');
  }
  res.sendStatus(200);
});

app.get('/api/filter/:deviceId/:filterId', (req, res) => {
  const deviceId = req.params.deviceId;
  const filterId = req.params.filterId;
  const socket = clients[deviceId];
  const message = {
    app: 'Web Socket',
    action: 'Update filter',
    data: { filterId: filterId },
  };
  const jsonMessage = JSON.stringify(message);
  console.log(jsonMessage);

  if (socket) {
    socket.send(jsonMessage);
  } else {
    console.log('No socket found for user');
  }
  res.sendStatus(200);
});

app.get('/api/images/:fileName', (req, res) => {
  const imageDirectory = path.join(__dirname, 'images');

  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error('Error reading image directory:', err);
      res.status(500).send('Internal server error');
      return;
    }

    const sortedFiles = files
      .filter((file) => file.endsWith('.jpg'))
      .map((file) => ({
        name: file,
        time: fs.statSync(path.join(imageDirectory, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    if (sortedFiles.length > 0) {
      const latestImage = sortedFiles[0];
      const imagePath = path.join(imageDirectory, latestImage.name);
      res.sendFile(imagePath);
    } else {
      res.status(404).send('No images found');
    }
  });
});

app.post('/api/images/:filename', (req, res) => {
  const { filename } = req.params;
  const imageData = req.body.data;

  const imageBuffer = Buffer.from(imageData, 'base64');

  fs.writeFile(filename, imageBuffer, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).send('Error saving image');
      return;
    }

    console.log('Image saved:', filename);
    res.status(200).send('Image saved successfully');
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});