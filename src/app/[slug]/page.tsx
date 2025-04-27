import Redirect from "@/components/Redirect";

const redirects: {[slug: string]: string} = {
    "centerme": "/CenterMe",
    "discord": "https://discord.com/invite/RztUGCK",
    "Discord": "https://discord.com/invite/RztUGCK",
    "github": "https://github.com/wolfyxon",
    "GitHub": "https://github.com/wolfyxon"
}

export async function generateStaticParams() {
    return Object.keys(redirects).map((key) => { return { slug: key }});
}

export default async function SlugRedirect(data: {params: any}) {
    const slug = (await data.params).slug as string;

    return <Redirect url={redirects[slug]} />
}