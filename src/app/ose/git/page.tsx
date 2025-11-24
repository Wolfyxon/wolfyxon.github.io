import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnokodowa Sieć Wersji"
}

const lts = "<<<<<<<";
const gts = ">>>>>>>";

export default function GitOsePage() {
    return <OsePage 
            icon="/assets/img/icons/software/tools/git.svg" 
            title={metadata.title as string}
            heading="Ta strona zawiera merge conflict"
            category="Merge Conflict"
            dynamicCategory="MERGE_CONFLICT GIT_PULL GIT_MERGE">

            <p>
                {lts} HEAD <br />
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Kontroli Wersji, która jest włączona w Twoim kodzie. <br />
                ======= <br />
                Dostęp do tej strony został zablokowany ze względu na usługę Ochrona Kontroli Kodu, która jest włączona w twoim narzędziu Git. <br />
                {gts} main
            </p>

            <p>Więcej o usłudze na <TextLink>https://git-scm.com/</TextLink></p>

        </OsePage>
}