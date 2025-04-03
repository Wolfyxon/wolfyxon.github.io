import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnorybska Sieć Szynki"
}

export default function KaroleusOsePage() {
    return <OsePage 
            icon="/assets/media/img/people/karoleus_pl.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera klasy"
            category="Wolfyxon's code"
            dynamicCategory="WOLFYXONS_CODE OBJECT_ORIENTED_PROGRAMMING CLASSES">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Programisty Karoleus, która jest włączona w Twoim kodzie.
            </p>

            <p>Więcej o usłudze na <TextLink>https://karoleuspl.github.io</TextLink>.</p>

        </OsePage>
}