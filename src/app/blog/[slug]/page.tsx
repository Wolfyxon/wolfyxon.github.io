import Markdown from "markdown-to-jsx";
import { getBySlug, getPosts } from "../blog";

import "../../css/animations.css";
import "../../css/article.css";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((v) => { return { slug: v.slug }});
}

export default async function BlogPost(data: {params: any}) {
    const slug = (await data.params).slug;
    const post = await getBySlug(slug);

    return (
        <>
            <div className="fancy-section">
                <Markdown>{post.markdown}</Markdown>
            </div>
        </>
    );
}