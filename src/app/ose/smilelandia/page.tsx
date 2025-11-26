import { Metadata } from "next";
import OsePage from "../OsePage";

export const metadata: Metadata = {
    title: "Ogólnowymiarowa Sieć Smilelandii"
}

export default function SmilelandiaOsePage() {
    return <OsePage 
            icon="/assets/img/ose/smilelandia.png" 
            title={metadata.title as string}
            heading="Ta strona chce nas uciszyć"
            category="Smilelandia doesn't exist"
            dynamicCategory="GOVERNMENT RZAD TUSK SMILELANDIA_NIE_ISTNIEJE">

            <p>
                Smilelandia istnieje a w niej są gombie. Wezwij brainrota krzesła a sam się przekonasz.
            </p>
        </OsePage>
}