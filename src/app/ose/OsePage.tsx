import { Metadata } from "next";
import { Content } from "@/utils";

import "./OsePage.css";

export const metadata: Metadata = {
    title: {
        template: "%s",
        default: "Odmowa dostępu"
    },
    description: "Parodia blokady OSE"
}

export type OsePageProps = {
    title: string, 
    icon: string, 
    heading: Content,
    category: Content,
    dynamicCategory: Content,
    children?: Content
}

export default function OsePage(data: OsePageProps) {
    // Adapted from OSE (Ogólnopolska Sieć Edukacyjna / General Polish Education Network) website block screen
    return (
    <>
        <p className="center">
            <a href="https://plug.ose.gov.pl/">
                <img src={data.icon} alt="-S" id="logo" />
            </a>
        </p>

        <p className="l-text center">{data.heading} ☹</p>

        <div id="b-texts">
            {data.children}
        </div>

        <hr />

        <p>Wygenerowano na wolf841x.ose.net.pl , 2025/02/12 12:27:04 dla adresu 4096:1b3:69420:a7be:2137:17ff:cd02:ff55</p>
        <p>
            <span className="msg">Zablokowano przez silnik analizy URL</span>
        </p>

        <p>Żądanie zostało zablokowane przez silnik analizy URL. Strona WWW należy do kategorii blokowanych przez system.</p>
        
        <p>
            <strong>URL: </strong> https://wolfyxon.github.io
        </p>

        <p><strong>Kategoria URL: </strong> {data.category}</p>

        <p id="cat">
            <strong>Kategoria z Dynamicznej Analizy Treści: </strong> 
            <span id="cat-val">{data.dynamicCategory}</span>
        </p>

        <p id="id">
            <strong>ID: </strong>
            <span id="id-val">02</span>
        </p>
        
        <hr />
    </>
    );
}