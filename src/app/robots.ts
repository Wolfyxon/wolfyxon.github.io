import { ROOT } from "@/globalData";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        sitemap: ROOT + "sitemap.xml",
        rules: [
            {
                userAgent: "*",
                disallow: [
                    "/*ref=*"
                ]
            },
            {
                disallow: "/",
                userAgent: [
                    "AI2Bot",
                    "Ai2Bot-Dolma",
                    "Amazonbot",
                    "anthropic-ai",
                    "Applebot",
                    "Applebot-Extended",
                    "Bytespider",
                    "CCBot",
                    "Claude-Web",
                    "ClaudeBot",
                    "cohere-ai",
                    "cohere-training-data-crawler",
                    "Crawlspace",
                    "Diffbot",
                    "DuckAssistBot",
                    "FacebookBot",
                    "FriendlyCrawler",
                    "Google-Extended",
                    "GoogleOther",
                    "GoogleOther-Image",
                    "GoogleOther-Video",
                    "GPTBot",
                    "iaskspider/2.0",
                    "ICC-Crawler",
                    "ImagesiftBot",
                    "img2dataset",
                    "ISSCyberRiskCrawler",
                    "Kangaroo Bot",
                    "Meta-ExternalAgent",
                    "Meta-ExternalFetcher",
                    "OAI-SearchBot",
                    "omgili",
                    "omgilibot",
                    "PanguBot",
                    "PerplexityBot",
                    "PetalBot",
                    "Scrapy",
                    "SemrushBot-OCOB",
                    "SemrushBot-SWA",
                    "Sidetrade indexer bot",
                    "Timpibot",
                    "VelenPublicWebCrawler",
                    "Webzio-Extended"
                ]
            }
        ]
    }
}
