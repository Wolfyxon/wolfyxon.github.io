import Footer from "@/components/essential/Footer/Footer";
import Header from "@/components/essential/Header/Header";

import "@/app/css/main.css";

export default function Page(data: { children: any, category: string, homeUrl?: string }) {
    return (
        <>
            <Header title={data.category} home={data.homeUrl} />

            <div id="main">
                {data.children}
            </div>

            <Footer />
        </>
    );
}