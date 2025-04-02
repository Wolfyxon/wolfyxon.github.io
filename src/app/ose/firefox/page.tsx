import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnomozillowa Sieć Firefox"
}

export default function AppleOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/firefox.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera silnik Chromium"
            category="Chromium"
            dynamicCategory="CHROMIUM GOOGLE_CHROME MICROSOFT_EDGE ELECTRON">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Przeglądarki Firefox, która jest włączona w Twojej przeglądarce.
            </p>

            <p>Więcej o usłudze <TextLink>https://www.mozilla.org/pl/firefox/</TextLink></p>

        </OsePage>
}