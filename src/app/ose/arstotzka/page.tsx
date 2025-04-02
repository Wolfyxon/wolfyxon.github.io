import { Metadata } from "next";
import OsePage from "../OsePage";

export const metadata: Metadata = {
    title: "Ogólnoarstotzka Sieć Antyprzestępcza"
}

export default function PisOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/arstotzka.png" 
            title="Ogólnoarstotzka Sieć Antyprzestępcza"
            heading="Ta strona nie ma wstępu"
            category="Invalid"
            dynamicCategory="INVALID_DOCUMENTS">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela Arstotzki, która jest włączona w naszym pięknym kraju.
            </p>

            <p>Chwała Arstotzce!</p>

        </OsePage>
}