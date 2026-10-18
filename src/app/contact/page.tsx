import MailLink from "@/components/links/MailLink";
import TextLink from "@/components/links/TextLink";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";

import { DISCORD_INVITE } from "@/globalData";

import { Metadata } from "next";
import FileContent from "@/components/FileContent";

export const metadata: Metadata = {
    title: "Contact",
    description: "Ways to contact me and some extra information"
}

export default function ContactPage() {
    return (
        <Page category="Contact">
            <ArticlePage title="Contact">
                <h1 id="ways-to-contact-me">Ways to contact me</h1>
                
                <h2 id="preferred">Preferred</h2>
                <ul>
                    <li>
                        Discord server: <TextLink>{DISCORD_INVITE}</TextLink> | <a href="https://discord.gg/2EBxwVpQGb">[backup link]</a>
                    </li>
                    <li>Email: <MailLink>wolfyxon@gmail.com</MailLink></li>
                </ul>
                
                <h2 id="non-preferred">Non preferred</h2>
                <p>
                    You may use these examples methods when you or me can't use the primary ones.
                </p>
                
                <ul>
                    <li>Open an issue on <a href="https://github.com/Wolfyxon/Wolfyxon/issues">this GitHub repo</a></li>
                    <li>Comment on one of my <a href="https://www.youtube.com/channel/UChIi7TxaLLZQpFTvWgNsvcQ">YouTube videos</a></li>
                    <li>Matrix: <b>@wolfyxon:matrix.org</b> <span className="faded">(Currently not actively checking. Avoid.)</span></li>
                    <li className="faded">Signal: (will reveal in an emergency)</li>
                </ul>

                <p>
                    Considering many of these methods involve public channels, consider using encryption if you want the message to be private.
                </p>

                <h1>Encryption & verification</h1>
                <p>Import this PGP key:</p>

                <pre>
                    <code>
                        <FileContent path="public/assets/pgp.txt"/>
                    </code>
                </pre>
                <a href="/assets/pgp.txt">Also as text file link</a>

                <p>
                    You can use it to send me an encrypted message only I will be able to decrypt, and you can use it to verify my digital signatures.
                </p>

                <p>
                    <a href="/docs/info/keys/">Documentation page about keys.</a> <br/>
                    <a href="/tools/pgp">Browser version of PGP</a> (Use carefully! If the site has been hijacked, your messages could be intercepted!)
                </p>

                <h1>Other ways of proving my identity</h1>
                <p>
                    To prove my identity without using cryptography:
                </p>

                <ul>
                    <li>Ask me for a codeword or inside joke.</li>
                    <li>Ask me a very specific question only we both would know the answer to.</li>
                    <li>Ask me to send some kind of image or other file you think I specifically should have.</li>
                    <li>Pay attention to my behavior and typing style.</li>
                    <li>Don't blindly trust voice messages! AI can easily copy someone's voice.</li>
                </ul> 
                

            </ArticlePage>
        </Page>
    )
}
