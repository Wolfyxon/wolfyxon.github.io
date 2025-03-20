import { getBySlug, getPosts } from "../blog";

import Page from "@/layouts/Page";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";

import "./blogPost.css";
import TextIcon from "@/components/TextIcon/TextIcon";

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

    const header = (
        <a href="/blog">
            <TextIcon src="/assets/media/img/icons/google/arrow-back.svg" alt="Back" />
            Back to posts
        </a>
    )

    return (
        <Page category="Blog" homeUrl="/blog">

            <ArticlePage title={post.title} headerElement={header}>
                {post.markdown}
            </ArticlePage>
            
            <p className="blog-post-date">{post.date.toDateString()}</p>
        </Page>
    );
}