import * as _nuxt_schema from '@nuxt/schema';
import { Server } from 'socket.io';

declare module "nitropack" {
    interface NitroRuntimeHooks {
        "socket.io": (io: Server) => void;
    }
}
interface ModuleOptions {
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { _default as default };
export type { ModuleOptions };
