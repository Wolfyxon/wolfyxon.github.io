import Redirect from "@/components/Redirect";

const redirects: {[slug: string]: string} = {
    "centerme": "/CenterMe/"
}

export async function generateStaticParams() {
    return Object.keys(redirects).map((key) => { return { slug: key }});
}

export default async function SlugRedirect(data: {params: any}) {
    const slug = (await data.params).slug as string;

    return <Redirect url={redirects[slug]} />
}