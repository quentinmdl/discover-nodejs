// Initialize & Configure Server
const express = require("express");
const path = require("path");
const app = express();

const { createServer } = require('http');
const server = createServer(app);

app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

// Inialize & Configure Socket
const { Server } = require("socket.io");
const io = new Server(server); 

// Configure Routes
app.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// Listening 
io.on('connection', (socket) => {
  console.log('Socket Connected');
});

io.on('connection', (socket) => {
  socket.on('msg', (msg) => {
    io.emit('msg', msg);
  });
});

server.listen("8101", function () {
  console.log("Server running");
});