import { getPosts } from "./blog";
import PostCard from "./PostCard/PostCard";

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