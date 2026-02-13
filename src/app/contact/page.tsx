import { DISCORD_INVITE } from "@/globalData";

import MailLink from "@/components/links/MailLink";
import TextLink from "@/components/links/TextLink";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";

export default function ContactPage() {
    return (
        <Page category="contact">
            <ArticlePage title="Contact">
                <h1>Ways to contact me</h1>
                <ul>
                    <li>Discord: <TextLink>{DISCORD_INVITE}</TextLink></li>
                    <li>Email: <MailLink>wolfyxon@gmail.com</MailLink></li>
                </ul>

                <h1>Privacy & verification</h1>
                <p>
                    If you'd like to encrypt your message, please consider encrypting it with
                    my <a href="/resources/gpg/wolfyxon.txt">public key</a>. <br/>
                    You may also use GPG/PGP to sign your message and prove your identity (if I have your public key already).
                </p>
                <p>
                    All instructions can be found in the <a href="/docs/info/keys/">key guide</a>.
                </p>

            </ArticlePage>
        </Page>
    )
}
