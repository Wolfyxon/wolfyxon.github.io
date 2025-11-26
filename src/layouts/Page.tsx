import Footer from "@/components/essential/Footer/Footer";
import Header from "@/components/essential/Header/Header";

import "@/css/main.css";
import Root from "./Root";
import ClientWorker from "@/components/essential/ClientWorker";
import { ReactNode } from "react";

export default function Page(props: { children: any, category: string, homeUrl?: string, head?: ReactNode }) {
    return (
        <Root>
            <head>
                {props.head}
            </head>
            <body>
                <Header title={props.category} home={props.homeUrl} />

                <div id="main">
                    {props.children}
                </div>

                <Footer />

                <ClientWorker />
            </body>
        </Root>
    );
}