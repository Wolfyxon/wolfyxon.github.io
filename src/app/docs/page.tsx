import Widget from "@/components/Widget/Widget";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";
import { getDocsInCategories } from "./docs";
import { Metadata } from "next";
import { Fragment } from "react";
import { capitalize } from "@/utils";

export const metadata: Metadata = {
    title: "Documentation",
    description: "Some documentation of my projects and me"
}

export default async function DocsHomePage() {
    return (
        <Page homeUrl="" category="Docs">
            <ArticlePage title="Documentation">
                <h1 id="welcome-to-my-documentation">Welcome to my documentation</h1>
                <p>
                    Here you can find some information about my projects
                    and me.
                    It can also serve the purpose of a blog. 
                </p>
                <p>
                    Each doc can also be viewed as plain markdown text, by adding <b>.md</b> at the end of the URL.
                </p>
                <p>
                    Also see the <a href="/about">about me page</a>.
                </p>

                <div id="doc-list">
                    {
                        (await getDocsInCategories()).map((category) => {
                            return (
                            <Fragment key={category.name}>
                            
                                <h2 id={category.name}>{capitalize(category.name)}</h2>
                                {
                                    category.docs.map((doc) => {
                                        if(doc.hidden) {
                                            return;
                                        }

                                        return <Widget title={doc.title} url={doc.slug.join("/")} key={doc.title}>
                                            {doc.description || "No Description"}
                                        </Widget>
                                    })
                                }
                            </Fragment>
                            )
                        })
                    }
                </div>

            </ArticlePage>
        </Page>
    )
}