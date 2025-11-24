import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnourządzeniowa Sieć Apple"
}

export default function AppleOsePage() {
    return <OsePage 
            icon="/assets/img/ose/apple.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera nieautoryzowane naprawy"
            category="Unauthorized Repairs"
            dynamicCategory="REPAIR TUTORIAL REPLACEMENT_PARTS">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Urządzeń Apple, która jest włączona w naszych urządzeniach.
            </p>

            <p>Więcej o usłudze <TextLink>https://www.apple.com/</TextLink></p>

        </OsePage>
}