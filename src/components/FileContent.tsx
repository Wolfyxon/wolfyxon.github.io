import * as fs from "fs";

export default async function FileContent(props: {path: string}) {
    return (<>
    {
        await fs.readFileSync(props.path, "utf-8")
    }
    </>)
}
