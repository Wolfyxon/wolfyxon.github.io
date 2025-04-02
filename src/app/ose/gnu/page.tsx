import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnoprogramowa Sieć Wolności"
}

export default function UssrOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/gnu.webp" 
            title={metadata.title as string}
            heading="Ta strona zawiera oprogramowanie własnościowe"
            category="Proprietary software"
            dynamicCategory="MICROSOFT WINDOWS GAMES CLOSED_SOURCE ANTI_CHEAT">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Użytkownika GNU, która jest włączona w Twoim kernelu.
            </p>

            <p>Więcej o usłudze na <TextLink>https://www.fsf.org/</TextLink></p>

        </OsePage>
}