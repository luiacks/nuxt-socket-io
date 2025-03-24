import { onUnmounted, ref } from "vue";
import { io } from "socket.io-client";
import type { Ref } from "vue";
import type { Socket } from "socket.io-client";

export function useSocket(...args: Parameters<typeof io>): Ref<Socket> {
  const socket = ref(io(...args)) as Ref<Socket>;

  onUnmounted(() => {
    socket.value.disconnect();
  });

  return socket;
}
