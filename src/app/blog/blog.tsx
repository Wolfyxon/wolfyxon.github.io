import * as fs from "fs";
import matter from "gray-matter";
import { basename } from "path";

export type PostData = {
    title: string,
    description: string,
    date: Date,
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
        date: new Date(mat.data.date),
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