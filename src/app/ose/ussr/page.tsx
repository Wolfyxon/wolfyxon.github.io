import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "Ogólnoruska Sieć Radziecka"
}

export default function UssrOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/ussr.png" 
            title={metadata.title as string}
            heading="Ta strona zawiera kapitalizm"
            category="Capitalism"
            dynamicCategory="CAPITALISM USA NATO POLAND WEST">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Obywatela ZSRR, która jest włączona w NASZYM związku.
            </p>

            <p>KOMUNIZM!!!</p>

        </OsePage>
}