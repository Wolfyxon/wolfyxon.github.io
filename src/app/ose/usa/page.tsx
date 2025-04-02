import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnostanowa Sieć Ameryki"
}

export default function ArstotzkaOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/usa.svg" 
            title={metadata.title as string}
            heading="Ta strona zawiera kilometry"
            category="Kilometer"
            dynamicCategory="EUROPE CHINA KILOMETER GULF_OF_MEXICO">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela Stanów Zjednoczonych, która jest włączona w Ameryce.
            </p>

            <p>Więcej o usłudze na <TextLink>https://www.usa.gov/</TextLink></p>

        </OsePage>
}