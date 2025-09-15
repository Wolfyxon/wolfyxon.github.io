import Footer from "@/components/essential/Footer/Footer";
import Header from "@/components/essential/Header/Header";

import "@/css/main.css";
import Root from "./Root";
import ClientWorker from "@/components/essential/ClientWorker";

export default function Page(data: { children: any, category: string, homeUrl?: string }) {
    return (
        <Root>
            <head></head>
            <body>
                <Header title={data.category} home={data.homeUrl} />

                <div id="main">
                    {data.children}
                </div>

                <Footer />

                <ClientWorker />
            </body>
        </Root>
    );
}