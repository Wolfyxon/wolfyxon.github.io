import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

import "./style.css";

export const metadata: Metadata = {
    title: "Ogólnopodziemna Sieć Podopowieści"
}

export default function SansOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/sans.webp" 
            title={metadata.title as string}
            heading={<span>Ta strona pamięta two'je <span id="glow">ludobujsfa</span></span>}
            category="Genocides"
            dynamicCategory="GENOCIDE CHARA">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Gwardia Królewska, która jest włączona w Podziemiu.
            </p>

            <p>Więcej o usłudze na <TextLink>https://undertale.com/</TextLink></p>

        </OsePage>
}