import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnonerdzka Sieć Wolfyxonacji"
}

export default function UssrOsePage() {
    // Ale mam nadzieję że moja strona nie jest ciulata XDDD
    return <OsePage 
            icon="/assets/media/img/Wolfyxon_opaque.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera ciulaty kod"
            category="Bad code"
            dynamicCategory="NO_CLASSES_OR_STRUCTS Improper_Naming REDUNDANCY LOW_PERFORMANCE">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Programisty WOLFYXON, która jest włączona w Twoim repozytorium.
            </p>

            <p>Więcej o usłudze na <TextLink>https://wolfyxon.github.io</TextLink></p>

        </OsePage>
}