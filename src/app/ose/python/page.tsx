import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnojęzykowa Sieć Pytonów"
}

export default function PythonaOsePage() {
    return <OsePage 
            icon="/assets/media/img/icons/software/lang/python.svg" 
            title={metadata.title as string}
            heading="Ta strona zawiera za dużo spacji"
            category="Invalid indentation"
            dynamicCategory="INVALID_INDENTATION INVALID_TABS INVALID_SPACE">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Języka Python, która jest włączona w Twoim interpreterze.
            </p>

            <p>Więcej o usłudze na <TextLink>https://www.python.org/</TextLink></p>

        </OsePage>
}