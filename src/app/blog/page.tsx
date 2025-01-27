import { getPosts } from "./blog";
import PostCard from "./PostCard/PostCard";

import "./blog.css";

export default async function Blog() {
    return (
        <>
            <h1>Posts</h1>

            <div id="posts">
                {
                    (await getPosts()).map((p) => PostCard({post: p}))
                }
            </div>
        </>
    );
}