import { getDocBySlug, getDocs } from "../docs";

import Page from "@/layouts/Page";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";

const REPO_URL = "https://github.com/Wolfyxon/wolfyxon.github.io/tree/main/public/docs";

export async function generateStaticParams() {
    const posts = await getDocs();
    return posts.map((v) => { return { slug: v.slug }});
}

export async function generateMetadata(data: {params: any}) {
    const slug = (await data.params).slug;
    const post = await getDocBySlug(slug);

    return {
        title: post.title + " - Documentation",
        description: post.description
    }
}

export default async function DocPage(props: {params: any}) {
    const slug = (await props.params).slug;
    const doc = await getDocBySlug(slug);

    const header = (
        <div>
            <a href={`${REPO_URL}/${slug}.md`}>See on GitHub</a> | <a href={`/docs/${slug}.md`}>Plain text</a>
        </div>
    )

    return (
        <Page category="Docs" homeUrl="/docs">
            <ArticlePage title={doc.title} headerElement={header}>
                {doc.markdown}
            </ArticlePage>
        </Page>
    )
}