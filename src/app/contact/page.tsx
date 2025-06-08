import MailLink from "@/components/MailLink";
import TextLink from "@/components/TextLink";
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
                    Discord: <TextLink>https://discord.com/invite/RztUGCK</TextLink>
                </p>
            </ArticlePage>
        </Page>
    )
}
