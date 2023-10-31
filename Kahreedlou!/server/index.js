const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { Server } = require("socket.io");
const http = require("http");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(
  cors({
      origin: 'http://localhost:3000', // Replace with your frontend origin
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  })
);




const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const router = require('./Router/router');
app.use(router);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
