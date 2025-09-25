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
                    "Brightbot 1.0",
                    "Bytespider",
                    "CCBot",
                    "ChatGPT Agent",
                    "ChatGPT-User",
                    "Claude-User",
                    "Claude-SearchBot",
                    "Claude-Web",
                    "ClaudeBot",
                    "CloudVertexBot",
                    "cohere-ai",
                    "cohere-training-data-crawler",
                    "Crawlspace",
                    "Cotoyogi",
                    "Diffbot",
                    "DuckAssistBot",
                    "FacebookBot",
                    "FirecrawlAgent",
                    "FriendlyCrawler",
                    "Gemini-Deep-Research",
                    "Google-Extended",
                    "GoogleOther",
                    "Google-CloudVertexBot",
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
                    "thetradedesk",
                    "SemrushBot-OCOB",
                    "SemrushBot-SWA",
                    "Sidetrade indexer bot",
                    "Timpibot",
                    "VelenPublicWebCrawler",
                    "Webzio-Extended",
                    "yacybot",
                    "YandexAdditional",
                    "YandexAdditionalBot"
                ]
            }
        ]
    }
}
