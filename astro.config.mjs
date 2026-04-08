// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  devToolbar: {
    enabled: false
  },
  vite: {
    server: {
      hmr: {
        // No explicit port/host here to allow it to inherit from the main server/proxy
      }
    }
  }
});
