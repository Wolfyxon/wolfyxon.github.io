import { getPosts, getPostsSorted } from "./blog";
import { Metadata } from "next";
import PostCard from "./PostCard/PostCard";

import "../css/animations.css";
import "./blog.css";
import Page from "@/layouts/Page";

export const metadata: Metadata = {
    title: "My blog",
    description: "Weird stuff written by me."
}

export default async function Blog() {
    return (
        <Page category="Blog">
            <h1>Posts</h1>

            <div id="posts">
                {
                    (await getPostsSorted()).map((p, i) => PostCard({post: p, key: i}))
                }
            </div>
        </Page>
    );
}