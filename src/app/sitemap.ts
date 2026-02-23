import { MetadataRoute } from 'next'
import { ROOT } from "@/globalData";

type SiteMapEntry = {
    page: string,
    priority: number,
    changeFrequency?: "yearly" | "always" | "hourly" | "daily" | "weekly" | "monthly" | "never"
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const sm: SiteMapEntry[] = [
        {
            page: "",
            priority: 1,
        },
        {
            page: "docs",
            priority: 0.9,
        },
        {
            page: "about",
            priority: 0.4,
        },
        {
            page: "terminal",
            priority: 0.6,
        },
        {
            page: "art",
            priority: 0.8
        },
        {
            page: "tools/player",
            priority: 0.5
        },
        {
            page: "tools/slideshow",
            priority: 0.4
        },
        {
            page: "tools/encryption",
            priority: 0.5
        },
        {
            page: "ose",
            priority: 0.5
        }
    ];

    const now  = new Date();

    return sm.map(v => ({
        url: ROOT + v.page,
        lastModified: now,
        changeFrequency: v.changeFrequency,
        priority: v.priority
    }));
}
