import Widget from "@/components/Widget/Widget";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";
import { getDocs } from "./docs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation",
    description: "Some documentation of my projects and me"
}

export default async function DocsHomePage() {
    return (
        <Page homeUrl="" category="Docs">
            <ArticlePage title="Documentation">
                <h1>Welcome to my documentation</h1>
                <p>
                    Here you can find some important information about my projects
                    and me.
                </p>
                <p>
                    Also see the <a href="/about">about me page</a>.
                </p>

                <div id="doc-list">
                    {
                        (await getDocs()).map((doc) => {
                            return <Widget title={doc.title} url={doc.slug} key={doc.title}>
                                {doc.description || "No Description"}
                            </Widget>
                        })
                    }
                </div>

            </ArticlePage>
        </Page>
    )
}