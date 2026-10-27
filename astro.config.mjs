// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://lab.shagoto.me',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
