import { toKebabCase } from "@/util/string";

export function runUnitTests() {
    const tests: ((() => string | undefined | null))[] = [
        testKebab,
    ];

    let okCount = 0;
    let failCount = 0;

    console.log("-- Running unit tests --");

    for(const func of tests) {
        let err = null;
        let ok = true;

        try {
            err = func();

            if(typeof(err) == "string") {
                ok = false;
            }

            console.log(`${func.name}: ${ok ? "ok" : "FAIL"}`);
        } catch(e) {
            err = e;
        }

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
