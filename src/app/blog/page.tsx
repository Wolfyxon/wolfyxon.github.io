import { getPosts } from "./blog";
import PostCard from "./PostCard/PostCard";

import "../css/animations.css";
import "./blog.css";

export default async function Blog() {
    return (
        <div id="blog">
            <h1>Posts</h1>

            <div id="posts">
                {
                    (await getPosts()).map((p) => PostCard({post: p}))
                }
            </div>
        </div>
    );
}