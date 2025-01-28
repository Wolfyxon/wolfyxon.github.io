import Markdown from "markdown-to-jsx";
import { getBySlug, getPosts } from "../blog";

import Page from "@/templates/Page";
import MarkdownPage from "@/templates/MarkdownPage/MarkdownPage";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((v) => { return { slug: v.slug }});
}

export async function generateMetadata(data: {params: any}) {
    const slug = (await data.params).slug;
    const post = await getBySlug(slug);

    return {
        title: post.title + " - Wolfyxon's blog",
        description: post.description
    }
}

export default async function BlogPost(data: {params: any}) {
    const slug = (await data.params).slug;
    const post = await getBySlug(slug);

    return (
        <Page category="Blog" homeUrl="/blog">
            <MarkdownPage>
                {post.markdown}
            </MarkdownPage>
        </Page>
    );
}