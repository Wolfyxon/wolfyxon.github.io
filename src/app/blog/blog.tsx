import * as fs from "fs";
import matter from "gray-matter";
import { basename } from "path";

export type PostData = {
    title: string,
    description: string,
    topics: [],
    date: Date,
    public?: boolean,
    markdown: string,
    slug: string
}

const postDir = "src/app/blog/posts";

export async function getPostFileNames(): Promise<string[]> {
    return fs.readdirSync(postDir).filter((v) => v.endsWith(".md"));
}

export async function parsePost(path: string): Promise<PostData> {
    const text = await fs.readFileSync(path);
    const mat = matter(text);
    
    const slug = basename(path.replace(postDir, "").replace(".md", ""));

    return {
        title: mat.data.title,
        description: mat.data.description,
        topics: mat.data.topics ?? [],
        date: new Date(mat.data.date),
        public: mat.data.public ?? true,
        markdown: mat.content,
        slug: slug,
    };
}

export async function getPosts(): Promise<PostData[]> {
    const names = await getPostFileNames();

    return Promise.all(names.map(async (filename) => {
        return await parsePost(`${postDir}/${filename}`);
    }));
}

export async function getPostsForListing(): Promise<PostData[]> {
    const posts = await getPosts();

    posts.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
    });

    return posts.filter((post) => post.public);
}

export async function getBySlug(slug: string): Promise<PostData> {
    return parsePost(`${postDir}/${slug}.md`);
}