import { defineConfig } from 'vite'
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

        // Am I insane or something
        const siteMapModule = await fs.readFileSync("./src/siteMap.tsx").toString();
        const jsonText = siteMapModule.split("export const pages = ")[1]
          .replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, "null") // remove component tags
          .replace(/(?<=\s)([a-zA-Z0-9_]+)(?=\s*:)/g, '"$1"')             // add quotes around keys
        ;

        const pages = JSON.parse(jsonText);

        const build = "./dist/";
        const mainHtml = build + "index.html";
        
        await Object.entries(pages).forEach(async (entry) => {
          const path = build + entry[0];
          
          if(!await fs.existsSync(path)) {
            console.log(">", path);

            await fs.mkdirSync(path);
            await fs.copyFileSync(mainHtml, path + "/index.html");
          }
        });
      }
    }
  ],
})
