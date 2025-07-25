import { Metadata } from "next";
import { ReactNode } from "react";

import "./OsePage.css";
import Timestamp from "@/components/Timestamp";

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
    heading: ReactNode,
    category: ReactNode,
    dynamicCategory: ReactNode,
    children?: ReactNode
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

        <p>Wygenerowano na wolf841x.ose.net.pl , <Timestamp /> dla adresu 4096:1b3:69420:a7be:2137:17ff:cd02:ff55</p>
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

        <footer>
            <p>
                Nie jestem związany z OSE ani żadną firmą ani organizacją wspomnianą na tej stronie.
                Ta strona jest parodią i nie ma na celu nikogo obrazić.
            </p>
            <p>
                I am not associated with OSE or any other companies or organizations mentioned on this page.
                This site is a parody and is not meant to offend anyone.
            </p>

            <a href="..">More</a>
        </footer>
    </>
    );
}