import * as fs from "fs";
import matter from "gray-matter";
import { basename } from "path";

const DOCS_PATH = "public/docs";

export type DocData = {
    title: string,
    description: string,
    markdown: string,
    slug: string[]
}

export type DocCategory = {
    name: string,
    docs: DocData[]
}

export async function getDocFolders(): Promise<string[]> {
    return fs.readdirSync(DOCS_PATH).filter((v) => fs.lstatSync(v).isDirectory())
}

export async function getDocPaths(dir: string = DOCS_PATH): Promise<string[]> {
    const res: string[] = []
    const paths = fs.readdirSync(dir);
   

    paths.forEach(async (v) => {
        const path = dir + "/" + v;

        if(fs.lstatSync(path).isDirectory()) {
            (await getDocPaths(path)).forEach((v) => {
                res.push(v);
            });
        } else {
            if(path.endsWith(".md")) {
                res.push(path.replace(DOCS_PATH + "/", ""));
            }
        }
    });

    return res;
}

export async function parseDoc(path: string): Promise<DocData> {
    const text = await fs.readFileSync(path);
    const mat = matter(text);
    
    const slug = path.replace(DOCS_PATH + "/", "").replace(".md", "").split("/");

    return {
        title: mat.data.title ?? slug,
        description: mat.data.description ?? "",
        markdown: mat.content,
        slug: slug
    };
}

export async function getDocs(): Promise<DocData[]> {
    const names = await getDocPaths();

    return Promise.all(names.map(async (filename) => {
        return await parseDoc(`${DOCS_PATH}/${filename}`);
    }));
}

export async function getDocsInCategories(): Promise<DocCategory[]> {
    const docs = await getDocs();
    let res: DocCategory[] = [];

    function add(category: string, doc: DocData) {
        for(const cat of res) {
            if(cat.name == category) {
                cat.docs.push(doc);
                return;
            }
        }

        res.push({
            name: category,
            docs: [doc]
        });
    }

    docs.forEach((doc) => {
        if(doc.slug.length == 1) {
            add("other", doc);
        } else {
            add(doc.slug[0], doc);
        }
    });

    return res;
}

export async function getDocBySlug(slug: string[]): Promise<DocData> {
    return parseDoc(`${DOCS_PATH}/${slug.join("/")}.md`);
}
