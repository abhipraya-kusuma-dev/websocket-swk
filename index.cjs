const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

server.listen(3001, () => {
  console.log("listen on :3001");
});

io.on("connection", (socket) => {
  console.log("socket connected");

  // APLIKASI SERAGAM
  socket.on("gudang-data-change", () => {
    console.log("gudang data change");
    io.emit("gudang-data-change");
  });

  socket.on("ukur-data-change", () => {
    console.log("ukur data change");
    io.emit("ukur-data-change");
  });
  // END APLIKASI SERAGAM

  // APLIKASI ANTRIAN
  socket.on("change antrian display", (antrian) => {
    console.log(antrian);
    io.emit("change antrian display", antrian);
  });
  socket.on("change antrian seragam display", (antrian) => {
    io.emit("change antrian seragam display", antrian);
  });

  socket.on("skip antrian", (skip) => {
    console.log(skip);
    io.emit("skip antrian", skip);
  });

  socket.on("change antrian display loading", (antrian) => {
    io.emit("change antrian display loading", antrian);
  });
  socket.on("change antrian display complete", (antrian) => {
    io.emit("change antrian display complete", antrian);
  });

  socket.on("change antrian seragam display loading", (antrian) => {
    io.emit("change antrian seragam display loading", antrian);
  });
  socket.on("change antrian seragam display complete", (antrian) => {
    io.emit("change antrian seragam display complete", antrian);
  });

  socket.on("play current antrian audio", (audioPath) => {
    io.emit("play current antrian audio", audioPath);
  });
  socket.on("play current antrian seragam audio", (audioPath) => {
    io.emit("play current antrian seragam audio", audioPath);
  });

  socket.on("new antrian created", (audioPath) => {
    io.emit("new antrian created", audioPath);
  });

  
  // END APLIKASI ANTRIAN

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});
