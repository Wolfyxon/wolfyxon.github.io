import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnopolska Sieć antylewacyjna"
}

export default function PisOsePage() {
    return <OsePage 
            icon="/assets/img/ose/pis.png" 
            title="Ogólnopolska Sieć Antylewacyjna"
            heading="Ta strona zawiera lewactwo"
            category="Lewactwo"
            dynamicCategory="TUSK GERMANY EUROPEAN_UNION">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela RP, która jest włączona w Twoim państwie.
            </p>

            <p>Chwała PiS! Niech żyje Kaczyński! <TextLink>https://pis.org.pl/</TextLink>.</p>

        </OsePage>
}