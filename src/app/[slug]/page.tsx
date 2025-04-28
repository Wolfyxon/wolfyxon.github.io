import Redirect from "@/components/Redirect";

type RedirectEntry = {
    aliases: string[],
    url: string
}

const redirects: RedirectEntry[] = [
    {
        aliases: ["centerme", "Centerme", "CenterME", "centreme", "CentreMe"],
        url: "https://wolfyxon.github.io/CenterMe",
    },
    {
        aliases: ["discord", "Discord"],
        url: "https://discord.com/invite/RztUGCK"
    },
    {
        aliases: ["github", "Github", "GitHub"],
        url: "https://github.com/wolfyxon"
    }
]

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

    return <Redirect url={redirect!.url} />;
}