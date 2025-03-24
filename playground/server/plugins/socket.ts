export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("socket.io", (io) => {
    io.on("connection", (socket) => {
      socket.on("ping", (callback) => {
        callback(Date.now());
      });
    });
  });
});
