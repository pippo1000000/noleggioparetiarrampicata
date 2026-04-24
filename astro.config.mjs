import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://noleggioparetiarrampicata.it',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    sitemap(),
  ],
  image: {
    format: ['webp'],
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  server: {
    host: true,
    port: 3005,
  },
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
