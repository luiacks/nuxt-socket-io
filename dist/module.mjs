import { defineNuxtModule, createResolver, addImports } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "nuxt-socket-io",
    configKey: "io"
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
        from: resolver.resolve("./runtime/useSocket")
      });
    });
  }
});

export { module as default };
