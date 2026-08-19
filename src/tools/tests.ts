import * as fs from "fs";
import { toKebabCase } from "@/util/string";
import { parseMarkdownYaml, YAMLData } from "@/util/mdyaml";

type TestResult = string | undefined | null;
type TestFunction = (() => TestResult) | (() => Promise<TestResult>);

export async function runUnitTests() {
    const tests: TestFunction[] = [
        testKebab,
        testMdYaml
    ];

    let okCount = 0;
    let failCount = 0;

    console.log("-- Running unit tests --");

    for(const func of tests) {
        let err = null;
        let ok = true;

        try {
            err = await func();

            if(typeof(err) == "string") {
                ok = false;
            }
        } catch(e) {
            ok = false;
            err = e;
        }

        console.log(`${func.name}: ${ok ? "ok" : "FAIL"}`);

        if(ok) {
            okCount++;
        } else {
            failCount++;
            console.log(err);
        }
    }

    console.log(`\nSuccessful: ${okCount} Failed: ${failCount}`);
}

function testKebab() {
    const pre = [
      "test",
      "Hello, World",
    ];

    const post = [
        "test",
        "hello-world"
    ];

    if(pre.length != post.length) {
        return "Length mismatch";
    }

    for(let i = 0; i < pre.length; i++) {
        const kebab = toKebabCase(pre[i]);
        
        if(kebab != post[i]) {
            return `"${kebab}" != "${post[i]}"`;
        }
    }
}

async function testMdYaml() {
    const mdNoYaml = await fs.readFileSync("src/testData/md.md").toString("utf-8");
    const parsedNoYaml = parseMarkdownYaml(mdNoYaml);
    
    if(Object.keys(parsedNoYaml.data).length != 0) {
        return `Data of md.md should be empty. Got: ${parsedNoYaml.data}`;
    }

    if(parsedNoYaml.content != "# Normal markdown") {
        return `Content mismatch for md.md: ${parsedNoYaml.data}`;
    }

    const mdYaml = await fs.readFileSync("src/testData/mdYaml.md").toString("utf-8");
    const parsedMdYaml = parseMarkdownYaml(mdYaml);

    if(parsedNoYaml.content != "# Normal markdown") {
        return `Content mismatch for md.md: ${parsedNoYaml.data}`;
    }

    if(parsedMdYaml.content.trim() != "content\nhi there") {
        return `Content mismatch for mdYaml.md: ${parsedMdYaml.content}`;
    }

    const expectedData: YAMLData = {
        key: "value",
        a: "b"
    };

    for(const [k, v] of Object.entries(expectedData)) {
        if(!parsedMdYaml.data[k]) {
            return `Missing '${k}' in data: ${JSON.stringify(parsedMdYaml.data)}`;
        }

        if(parsedMdYaml.data[k] != v) {
            return `Value mismatch for ${k}: "${parsedMdYaml.data[k]}" != "${v}"`;
        }
    }

    for(const [k, v] of Object.entries(parsedMdYaml.data)) {
        if(!expectedData[k]) {
            return `Excessive data key "${k}"`;
        }
    }
    
}
