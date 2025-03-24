import { defineNitroPlugin } from "nitropack/runtime";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
export default defineNitroPlugin(async (nitroApp) => {
  const engine = new Engine();
  const io = new Server();
  io.bind(engine);
  nitroApp.hooks.callHook("socket.io", io);
  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          engine.prepare(peer._internal.nodeReq);
          engine.onWebSocket(
            // @ts-ignore
            peer._internal.nodeReq,
            // @ts-ignore
            peer._internal.nodeReq.socket,
            peer.websocket
          );
        }
      }
    })
  );
});
