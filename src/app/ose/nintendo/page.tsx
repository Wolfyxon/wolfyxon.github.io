import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";
import Timer from "@/components/Timer";

export const metadata: Metadata = {
    title: "Ogólnoświatowa Sieć Nintendo"
}

export default function NintendoOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/nintendo.png" 
            title={metadata.title as string}
            heading="Ta strona łamie prawa autorskie"
            category="Copyright infringement"
            dynamicCategory="PIRACY MUSIC FAN_GAMES EMULATION">

            <p>
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Gracza Nintendo, która jest włączona w Twojej konsoli.
            </p>
            <p>
                Specjalny oddział Ninja został wysłany do twojej lokalizacji. <br />
                Szacowany czas dotarcia: <strong><Timer seconds={6000}>%hh:%mm:%ss</Timer></strong>
            </p>

            <p>Więcej o usłudze na <TextLink>https://www.nintendo.com/</TextLink>.</p>

        </OsePage>
}