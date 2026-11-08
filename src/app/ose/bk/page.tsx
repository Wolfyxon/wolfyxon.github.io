import { Metadata } from "next";
import OsePage from "../OsePage";

export const metadata: Metadata = {
    title: ":3"
}

export default function BkOsePage() {
    return <OsePage 
            icon="/assets/img/ose/bk.gif" 
            title={metadata.title as string}
            heading="Ojej"
            category=":3"
            dynamicCategory=":3">

            <p>
                &gt;~&lt;
            </p>

            <p>:3</p>

        </OsePage>
}