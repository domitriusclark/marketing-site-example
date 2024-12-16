import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sanity({
      projectId: "t8gds5es",
      dataset: "production",
      useCdn: false,
    }),
  ],
  adapter: netlify(),
});
