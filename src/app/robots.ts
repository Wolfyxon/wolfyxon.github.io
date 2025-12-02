import { ROOT } from "@/globalData";
import { readFileSync, readSync } from "fs";
import { MetadataRoute } from "next";

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
                    "/assets/img/home/banner.webp",
                    "/3ds-web-stuff/img/logos",
                    "/assets/img/art/Forest_Witch.webp"
                ]
            },
            {
                disallow: "/",
                userAgent: (await getAiUserAgentData()).userAgents
            }
        ]
    }
}
