import MailLink from "@/components/links/MailLink";
import TextLink from "@/components/links/TextLink";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";
import Page from "@/layouts/Page";

import { DISCORD_INVITE } from "@/globalData";

import { Metadata } from "next";

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

                <h1 id="verifying-my-identity">Verifying my identity</h1>
                <p>
                    If you know me well, simply ask me a few questions you're sure only I would know the answer to, but at the
                    same time isn't well known.
                </p>
                <p>
                    You may also request me to create a signed message that you can verify with my <a href="/assets/pgp.txt">public PGP key</a>.
                    If you don't know how to do that, see the <a href="/docs/info/keys/">documentation page about keys</a>.
                    If I refuse to do that, someone could be impersonating me.
                </p>

                <h1 id="encryption">Encryption</h1>
                <p>
                    The public key mentioned above may also be used to encrypt files and messages only I will be able to decrypt.
                    Everything is explained in the documentation.
                </p>

                <p>
                    You can also use the <a href="/tools/pgp/">online PGP page</a>, but if this site has been compromised, someone could be intercepting your messages,
                    so be careful.
                </p>
            </ArticlePage>
        </Page>
    )
}
