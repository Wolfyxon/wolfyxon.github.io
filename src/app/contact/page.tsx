import { DISCORD_INVITE } from "@/globalData";

import MailLink from "@/components/links/MailLink";
import TextLink from "@/components/links/TextLink";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";

export default function ContactPage() {
    return (
        <Page category="contact">
            <ArticlePage title="Contact">
                <h1>How to reach me</h1>
                <p>
                    Email: <MailLink>wolfyxon@gmail.com</MailLink>
                </p>
                <p>
                    Discord: <TextLink>{DISCORD_INVITE}</TextLink>
                </p>
            </ArticlePage>
        </Page>
    )
}
