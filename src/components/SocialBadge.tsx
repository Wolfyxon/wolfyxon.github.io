import LinkBadge from "./LinkBadge";

export type WebsiteData = {
    url: string,
    name: string,
    icon: string,
}

export const websites: {[id: string]: WebsiteData} = {
    "github": {
        url: "github.com",
        name: "GitHub",
        icon: "github.svg"
    },
    "youtube": {
        url: "youtube.com",
        name: "YouTube",
        icon: "youtube.svg"
    },
    "soundcloud": {
        url: "soundcloud.com",
        name: "SoundCloud",
        icon: "soundcloud.webp"
    },
    "discord": {
        url: "discord.gg",
        name: "Discord",
        icon: "discord.svg"
    },
    "x": {
        url: "x.com",
        name: "X (Twitter)",
        icon: "x.webp"
    }
}

export default function SocialBadge(data: {site: WebsiteData, link: string}) {
    const url = `https://${data.site.url}/${data.link}`;
    const icon = `social/${data.site.icon}`;

    return <LinkBadge url={url} icon={icon} alt={data.site.name} />
}