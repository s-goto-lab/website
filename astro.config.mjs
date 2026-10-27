// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://lab.shagoto.me',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  integrations: [
    {
      name: 'internal-preview-routes',
      hooks: {
        'astro:config:setup': ({ injectRoute, command }) => {
          // Internal review/study routes are available during local development only
          // and are strictly excluded from production builds.
          if (command === 'dev') {
            injectRoute({
              pattern: '/brand-study',
              entrypoint: './src/preview/brand-study.astro'
            });
          }
        }
      }
    }
  ]
});
