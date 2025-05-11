import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnojęzykowa Sieć Pamięci"
}

export default function RustOsePage() {
    return <OsePage 
            icon="/assets/media/img/icons/software/lang/rust.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera niewłaściwą pamięć"
            category="Memory Unsafe"
            dynamicCategory="USE_AFTER_FREE NULL BUFFER_OVERFLOW MEMORY_CORRUPTION C C++">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Pamięci Programu, która jest włączona w Twoim języku.
            </p>

            <p>Więcej o usłudze na <TextLink>https://www.rust-lang.org/</TextLink>.</p>

        </OsePage>
}