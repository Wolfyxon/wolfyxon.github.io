import * as fs from "fs";
import { Metadata } from "next";

import "./page.css";

export const metadata: Metadata = {
    title: "Parodie OSE",
    description: "Strona z parodiami blokady Ogólnopolskiej Sieci Edukacyjnej"   
}

const dir = "src/app/ose/";

export default function OseHomePage() {
    return (
        <>
            <h1>Ta strona zawiera parodie OSE ☹</h1>
            
            <div id="links">
                {getPages().map((v) => {
                    return <a href={"./" + v} key={v}>{v}</a>
                })}
            </div>
            
            <a href="/">Strona główna</a>

            <p>
                Nie chciało mi się stylować tej strony. 
                Po prostu wybierz co chcesz.
            </p>
        </>
    )
}

function getPages(): string[] {
    const res: string[] = []

    fs.readdirSync(dir).forEach((v) => {
        if(fs.statSync(dir + v).isDirectory()) {
            res.push(v);
        }
    });

    return res;
}