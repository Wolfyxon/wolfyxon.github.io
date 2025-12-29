import { ReactNode } from "react";

import Footer from "@/components/global/Footer/Footer";
import Header from "@/components/global/Header/Header";
import ClientWorker from "@/components/global/ClientWorker";
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

                <main id="main" role="main">
                    {props.children}
                </main>

                <Footer />

                <ClientWorker />
            </body>
        </Root>
    );
}