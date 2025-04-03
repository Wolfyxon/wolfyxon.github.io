import { Metadata } from "next";
import OsePage from "../OsePage";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
    title: "中國安防網"
}

export default function ChinaOsePage() {
    return <OsePage 
            icon="/assets/media/img/ose/china.png"
            title={metadata.title as string}
            heading="本網站含有錯誤訊息"
            category="Misinformation"
            dynamicCategory="HONG_KONG DEMOCRACY FREEDOM UNITED_STATES TAIWAN">

            <p>
                由於您所在國家/地區啟用了中國公民保護服務，因此無法存取此頁面。
            </p>

            <p>有關該服務的更多信息，請訪問 <TextLink>https://english.www.gov.cn/</TextLink>.</p>

        </OsePage>
}