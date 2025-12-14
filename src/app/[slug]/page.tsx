import RedirectPage from "@/layouts/RedirectPage";
import { DISCORD_INVITE } from "@/globalData";

type RedirectEntry = {
    aliases: string[],
    url: string
}

const redirects: RedirectEntry[] = [
    {
        aliases: ["discord", "Discord"],
        url: DISCORD_INVITE
    },
    {
        aliases: ["github", "Github", "GitHub"],
        url: "https://github.com/wolfyxon"
    },
    {
        aliases: ["soundcloud", "Soundcloud", "SoundCloud"],
        url: "https://soundcloud.com/wolfyxon"
    },
    {
        aliases: ["youtube", "YouTube", "yt", "YT"],
        url: "https://www.youtube.com/@Wolfyxon"
    },
    {
        aliases: ["3ds", "3DS", "3ds-stuff", "3DS-stuff", "3DStuff", "3dswebstuff", "3DSWebStuff"],
        url: "https://wolfyxon.github.io/3ds-web-stuff"
    },
    {
        aliases: ["centerme", "Centerme", "CenterME", "centreme", "CentreMe"],
        url: "https://wolfyxon.github.io/CenterMe",
    },
    {
        aliases: ["songwrap", "Songwrap", "song-wrap", "SongWarp", "songwarp", "Songwrap", "song-warp"],
        url: "https://wolfyxon.github.io/SongWrap"
    }
];

function getRedirect(slug: string): RedirectEntry | null {
    for(const r of redirects) {
        if(r.aliases.includes(slug)) {
            return r;
        }
    }
    
    return null;
}

export async function generateStaticParams() {
    const res: {slug: string}[] = [];

    redirects.forEach((v) => {
        v.aliases.forEach((v) => res.push({slug: v}));
    });

    return res;
}

export default async function SlugRedirect(data: {params: any}) {
    const slug = (await data.params).slug as string;
    const redirect = getRedirect(slug);

    return <RedirectPage url={redirect!.url} />;
}