import { getPosts } from "./blog";
import { Metadata } from "next";
import PostCard from "./PostCard/PostCard";

import "../css/animations.css";
import "./blog.css";

export const metadata: Metadata = {
    title: "My blog - Wolfyxon",
    description: "Weird stuff written by me."
}

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