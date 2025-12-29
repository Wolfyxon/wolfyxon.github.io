import { ReactNode } from "react";
import { DISCORD_INVITE } from "@/globalData";

import "./Footer.css";

export default function Footer() {
    return (    
        <footer>
            <div id="footer-columns">
                <Column title="Repository">
                    <a href="https://github.com/Wolfyxon/wolfyxon.github.io">Source code</a>
                    <a href="https://github.com/Wolfyxon/wolfyxon.github.io/issues">Bugs & suggestions</a>
                </Column>

                <Column title="Utilities">
                    <a href="/player">Player</a>
                    <a href="/slideshow">Slideshow</a>
                </Column>

                <Column title="Other">
                    <a href="/ose">OSE</a>
                    <a href="/archive/lighter/tgdod">Lighter</a>
                </Column>

                <Column title="Contact">
                    <a href="mailto:wolfyxon@gmail.com" translate="no">wolfyxon@gmail.com</a>
                    <a href={DISCORD_INVITE}>Discord</a>
                </Column>
            </div>
            
            <p>This website is licensed under <a href="https://github.com/Wolfyxon/wolfyxon.github.io/blob/main/LICENSE">GPL-3.0</a>.</p>
            <p>Made by Wolfyxon.</p>
        </footer>
    );
}

function Column(props: {title: string, children: ReactNode}) {
    return (
        <div className="footer-column">
            <div className="footer-column-title">{props.title}</div>
            {props.children}
        </div>
    )
}