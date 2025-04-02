import { Metadata } from "next";
import OsePage from "../OsePage";

export const metadata: Metadata = {
    title: "Ogólnopolska Sieć antylewacyjna"
}

export default function PisOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/pis.png" 
            title="Ogólnopolska Sieć Antylewacyjna"
            heading="Ta strona zawiera lewactwo"
            category="Lewactwo"
            dynamicCategory="LEWACTWO BRAINROT SKIBIDI_TOILET">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela RP, która jest włączona w Twoim państwie.
            </p>

            <p>Chwała PiS! Niech żyje Kaczyński! <a href="https://pis.org.pl/">https://pis.org.pl/</a>.</p>

        </OsePage>
}