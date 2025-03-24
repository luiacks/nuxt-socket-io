import { onUnmounted, ref } from "vue";
import { io } from "socket.io-client";
export function useSocket(...args) {
  const socket = ref(io(...args));
  onUnmounted(() => {
    socket.value.disconnect();
  });
  return socket;
}
