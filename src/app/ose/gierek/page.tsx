import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/links/TextLink";

export const metadata: Metadata = {
    title: "Ogólnogierkowa Sieć Robotnicza"
}

export default function GierekOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/gierek.jpg" 
            title={metadata.title as string}
            heading="Ta strona zawiera gierki"
            category="Games"
            dynamicCategory="GAMES GAMING VIDEO_GAMES">

            <p>
                Ładnie to tak w gierki grać na lekcji kolego?
            </p>

            <p>
                Do roboty a nie.
            </p>

        </OsePage>
}