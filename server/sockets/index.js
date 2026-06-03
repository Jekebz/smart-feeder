function registerSockets(io) {
  io.on("connection", (socket) => {
    socket.emit("camera_status", { online: true, streamUrl: "/uploads/demo-camera.mp4" });
  });
}

module.exports = registerSockets;
