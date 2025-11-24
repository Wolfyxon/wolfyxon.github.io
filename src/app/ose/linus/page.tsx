import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnokernelowa Sieć AntyNVIDiowa"
}

export default function LinusOsePage() {
    return <OsePage 
            icon="/assets/img/ose/linus.webp" 
            title={metadata.title as string}
            heading="Ta strona zawiera NVIDIe"
            category="NVIDIA"
            dynamicCategory="NVIDIA">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Linux, która jest włączona w twoim kernelu.
            </p>

            <p>Więcej o usłudze na <TextLink>https://kernel.org</TextLink>.</p>

        </OsePage>
}