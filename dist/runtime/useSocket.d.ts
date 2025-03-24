import { io } from "socket.io-client";
import type { Ref } from "vue";
import type { Socket } from "socket.io-client";
export declare function useSocket(...args: Parameters<typeof io>): Ref<Socket>;
