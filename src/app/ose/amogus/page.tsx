import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnogalaktyczna Sieć Załogowa"
}

export default function AmogusOsePage() {
    return <OsePage 
            icon="/assets/img/ose/amogus.webp" 
            title={metadata.title as string}
            heading="Ta strona jest sus"
            category="Impostor"
            dynamicCategory="SUS SUSSY IMPOSTOR">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Członka Załogi, która jest włączona w Twoim statku.
            </p>

            <p>Więcej o usłudze na <TextLink>https://www.innersloth.com/games/among-us/</TextLink></p>

        </OsePage>
}