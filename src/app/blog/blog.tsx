import * as fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";

export type PostData = {
    title: string,
    description: string,
    date: Date,
    markdown: string,
    slug: string
}

export async function getPostFileNames(): Promise<string[]> {
    return fs.readdirSync("./posts/").filter((v) => v.endsWith(".md"));
}

export function parsePost(path: string): PostData {
    const mat = matter(path);
    
    return {
        title: mat.data.title,
        description: mat.data.description,
        date: new Date(mat.data.date),
        markdown: mat.content,
        slug: path.replace(".md", ""),
    };
}