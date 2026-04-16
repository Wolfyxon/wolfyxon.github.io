import { DISCORD_INVITE } from "@/globalData";

import MailLink from "@/components/links/MailLink";
import TextLink from "@/components/links/TextLink";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";

export default function ContactPage() {
    return (
        <Page category="Contact">
            <ArticlePage title="Contact">
                <h1>Ways to contact me</h1>
                <ul>
                    <li>Discord server: <TextLink>{DISCORD_INVITE}</TextLink></li>
                    <li>Email: <MailLink>wolfyxon@gmail.com</MailLink></li>
                </ul>

                <h2>Unconventional</h2>
                <p>
                    You may use these methods in emergencies when you can't use the primary ones.
                </p>
                
                <ul>
                    <li>Open an issue on any of my <a href="https://github.com/Wolfyxon/">GitHub repositories</a></li>
                    <li>Comment on one of my <a href="https://www.youtube.com/channel/UChIi7TxaLLZQpFTvWgNsvcQ">YouTube videos</a></li>
                </ul>

                <p>
                    If something bad happens, I will likely reveal more methods.
                </p>

                <h1>How to verify my identity</h1>
                <p>
                    If you know me well, simply ask me a few questions you're sure only I would know the answer to.
                </p>
                <p>
                    You may also request me to create a signed message that you can verify with my <a href="/resources/publicKeys/wolfyxon.txt">public PGP key</a>.
                    If you don't know how to do that, see the <a href="/docs/info/keys/">documentation page about keys</a>.
                    If I refuse to do that, someone could be impersonating me.
                </p>

                <h1>Encryption</h1>
                <p>
                    The public key mentioned above may also be used to encrypt files and messages only I will be able to decrypt.
                    Everything is explained in the documentation.
                </p>

            </ArticlePage>
        </Page>
    )
}
