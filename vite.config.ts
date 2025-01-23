import { defineConfig } from 'vite'
import { pages } from './src/siteMap.ts'
import react from '@vitejs/plugin-react'
import * as fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    {
      name: "Post build",
      closeBundle: async () => {
        console.log("Cloning index.html for proper static routing");

        const build = "./dist/";
        const mainHtml = build + "index.html";

        await Object.entries(pages).forEach(async (entry) => {
          const path = build + entry[0];
          
          if(!await fs.existsSync(path)) {
            await fs.mkdirSync(path);
            await fs.copyFileSync(mainHtml, path + "/index.html");
          }
        });
      }
    }
  ],
})
