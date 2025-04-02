import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnonerdzka Sieć Wolfyxonacji"
}

export default function UssrOsePage() {
    return <OsePage 
            icon="/assets/media/img/Wolfyxon_opaque.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera Windowsa"
            category="Microsoft Windows"
            dynamicCategory="MICROSOFT WINDOWS CLOSED_SOURCE NO_CONTROL FORCED_UPDATES">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Systemu WOLFYXON, która jest włączona w Twojej boot partycji.
            </p>

            <p>Więcej o usłudze na <TextLink>https://wolfyxon.github.io</TextLink></p>

        </OsePage>
}