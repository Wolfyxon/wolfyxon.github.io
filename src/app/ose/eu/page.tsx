import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnoeuropejska Sieć Antyapplowska"
}

export default function PisOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/eu.webp" 
            title={metadata.title as string}
            heading="Ta strona zawiera Apple"
            category="Apple"
            dynamicCategory="LIGHTNING_CABLE">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela UE, która jest włączona na Twoim kontynencie.
            </p>

            <p>Więcej o usłudze na <TextLink>https://european-union.europa.eu/index_en</TextLink>.</p>

        </OsePage>
}