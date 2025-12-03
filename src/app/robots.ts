import { ROOT } from "@/globalData";
import { readFileSync, readSync } from "fs";
import { MetadataRoute } from "next";
import { DRAWINGS } from "./art/drawingData";

export const dynamic = "force-static";

export const AI_USER_AGENTS_PATH = "src/data/aiUserAgents.json";

export type AiUserAgentData = {
    lastUpdate: string,
    userAgents: string[]
};

export async function getAiUserAgentData(): Promise<AiUserAgentData> {
    const file = await readFileSync(AI_USER_AGENTS_PATH, "utf-8");
    return JSON.parse(file.toString());
}

function getHiddenDrawingURLs(): string[] {
    const res: string[] = [];

    for(let i = 0; i < DRAWINGS.length; i++) {
        const drawing = DRAWINGS[i];
        
        if(drawing.hideFromSE) {
            res.push(drawing.src);
        }
    }

    return res;
}

export default async function robots(): Promise<MetadataRoute.Robots> {
    return {
        sitemap: ROOT + "sitemap.xml",
        rules: [
            {
                userAgent: [
                    "Googlebot",
                    "Googlebot-Image",
                    "bingbot"
                ],
                disallow: [
                    "/*ref=*",
                    "/assets/img/icons",
                    "/assets/img/ose",
                    "/assets/video/bad_apple.mp4",
                    "/assets/img/home/banner.webp",
                    "/3ds-web-stuff/img/logos",

                    ...getHiddenDrawingURLs()
                ]
            },
            {
                disallow: "/",
                userAgent: (await getAiUserAgentData()).userAgents
            }
        ]
    }
}
