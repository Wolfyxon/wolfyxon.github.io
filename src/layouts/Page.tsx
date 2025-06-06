import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

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