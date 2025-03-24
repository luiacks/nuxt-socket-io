import { defineNuxtModule, createResolver, addImports } from "@nuxt/kit";
import type { Server } from "socket.io";

declare module "nitropack" {
  interface NitroRuntimeHooks {
    "socket.io": (io: Server) => void;
  }
}

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-socket-io",
    configKey: "io",
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    _nuxt.hook("nitro:config", (nitroConfig) => {
      if (nitroConfig.experimental) {
        nitroConfig.experimental.websocket = true;
      }

      _nuxt.hook("nitro:build:before", (nitro) => {
        nitro.options.plugins.push(resolver.resolve("./runtime/server"));
      });

      addImports({
        name: "useSocket",
        as: "useSocket",
        from: resolver.resolve("./runtime/useSocket"),
      });
    });
  },
});
