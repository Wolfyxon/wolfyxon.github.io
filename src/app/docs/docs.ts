import * as fs from "fs";
import matter from "gray-matter";
import { basename } from "path";

const DOCS_PATH = "public/docs";

export type DocData = {
    title: string,
    description: string,
    markdown: string,
    slug: string
}

export async function getDocFileNames(): Promise<string[]> {
    return fs.readdirSync(DOCS_PATH).filter((v) => v.endsWith(".md"));
}

export async function parseDoc(path: string): Promise<DocData> {
    const text = await fs.readFileSync(path);
    const mat = matter(text);
    
    const slug = basename(path.replace(DOCS_PATH, "").replace(".md", ""));

    return {
        title: mat.data.title ?? slug,
        description: mat.data.description ?? "",
        markdown: mat.content,
        slug: slug
    };
}

export async function getDocs(): Promise<DocData[]> {
    const names = await getDocFileNames();

    return Promise.all(names.map(async (filename) => {
        return await parseDoc(`${DOCS_PATH}/${filename}`);
    }));
}

export async function getDocBySlug(slug: string): Promise<DocData> {
    return parseDoc(`${DOCS_PATH}/${slug}.md`);
}
