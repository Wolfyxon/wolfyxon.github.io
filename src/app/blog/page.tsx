import { getPostsForListing } from "./blog";
import { Metadata } from "next";
import PostCard from "./PostCard/PostCard";

import "../css/animations.css";
import "./blog.css";
import Page from "@/layouts/Page";
import Warning from "@/components/Warning/Warning";
import { DISCORD_INVITE } from "@/globalData";

export const metadata: Metadata = {
    title: "My blog",
    description: "Weird stuff written by me."
}

export default async function Blog() {
    return (
        <Page category="Blog">
            <Warning>
                <h1>Archived</h1>
                <p>
                    The blog has been archived and will no longer be updated.
                </p>
                <p>
                    For similar articles, see <a href="/docs">the documentation</a> <br/>
                    For announcements, my <a href={DISCORD_INVITE}>Discord server</a>.
                </p>
            </Warning>
            <h1>Posts</h1>

            <div id="posts">
                {
                    (await getPostsForListing()).map((p, i) => PostCard({post: p, key: i}))
                }
            </div>
        </Page>
    );
}