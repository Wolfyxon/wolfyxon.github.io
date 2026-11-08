import { Metadata } from "next";
import OsePage from "../OsePage";

export const metadata: Metadata = {
    title: "OgólnoPOLSKA Sieć"
}

export default function KkpOsePage() {
    return <OsePage 
            icon="/assets/img/ose/kkp.webp" 
            title="OgólnoPOLSKA Sieć"
            heading="Ta strona to eurokołchoz"
            category="Eurokołchoz"
            dynamicCategory="TUSK GERMANY UKRAINE EUROPEAN_UNION"
            
            blockedByText="Заблокировано механизмом анализа URL-адресов"
            urlCategoryText="Категория URL:"
            requestBlockedLongText="Запрос был заблокирован механизмом анализа URL-адресов. Сайт относится к категории заблокированных системой."
            dynamicCategoryText="Категория в динамическом контент-анализе:"
            
            >
            
            <p>
                Szczęść Boże, ratuj się kto może. 🧯
            </p>

            <p>Nie będziesz mi tu na jakieś lewackie niemieckie strony wchodził.</p>

        </OsePage>
}