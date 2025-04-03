import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnoziemska Sieć Kombinatu"
}

export default function CombineOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/combine.svg" 
            title={metadata.title as string}
            heading="Ta strona zawiera ruch oporu"
            category="Resistance"
            dynamicCategory="GORDON_FREEMAN ELI_VANCE">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela Ziemi, która jest włączona na Twojej planecie.
            </p>

            <p>Więcej o usłudze na <TextLink>https://half-life.fandom.com/wiki/Combine</TextLink></p>

        </OsePage>
}