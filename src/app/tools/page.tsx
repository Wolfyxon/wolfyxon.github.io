import * as fs from "node:fs";
import Page from "@/layouts/Page";

import "@/css/pageInset.css";
import "./mainPageStyle.css";

export default function ToolsPage() {
    const pages = fs.readdirSync("src/app/tools").filter((v) => !v.includes("."));

    return (
    <Page category="Tools" homeUrl="/tools">
        <h1>Available tools:</h1>
        <div id="links">
            {
                pages.map((page) => <div key={page}><a href={page}>{page}</a></div>)
            }
        </div>
    </Page>
   )
}
