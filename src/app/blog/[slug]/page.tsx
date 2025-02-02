import { getBySlug, getPosts } from "../blog";

import Page from "@/templates/Page";
import ArticlePage from "@/templates/ArticlePage/ArticlePage";

import "./blogPost.css";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((v) => { return { slug: v.slug }});
}

export async function generateMetadata(data: {params: any}) {
    const slug = (await data.params).slug;
    const post = await getBySlug(slug);

    return {
        title: post.title + " - Blog",
        description: post.description
    }
}

export default async function BlogPost(data: {params: any}) {
    const slug = (await data.params).slug;
    const post = await getBySlug(slug);

    return (
        <Page category="Blog" homeUrl="/blog">
            <ArticlePage title={post.title}>
                {post.markdown}
            </ArticlePage>
            
            <p className="blog-post-date">{post.date.toDateString()}</p>
        </Page>
    );
}