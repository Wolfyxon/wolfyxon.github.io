import { ReactNode } from "react";

import Footer from "@/components/essential/Footer/Footer";
import Header from "@/components/essential/Header/Header";
import ClientWorker from "@/components/essential/ClientWorker";
import Root from "./Root";

import "@/css/fonts/roboto.css";
import "@/css/main.css";

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