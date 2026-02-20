import type { Metadata } from "next";

import Page from "@/layouts/Page";
import ArticlePage from "@/layouts/ArticlePage/ArticlePage";

export const metadata: Metadata = {
    title: "About me",
    description: "Something about me",
};

export default function About() {
    return (
        <Page category="About">
            <ArticlePage title="About me">
                <section>
                    <h1 id="who-am-i">Who am I</h1>
                    <h2>
                        Hi, I'm Wolfyxon.
                    </h2>
                    <p>
                        I'm a young programmer guy from Poland. <br />
                        I've been coding since I was 9 years old. 
                    </p>
                    <p>
                        The stuff I primarily make is tools, websites and games. 
                        I code for fun and enjoy learning new stuff.
                    </p>
                    <p>
                        I'm also into electronics. I like prototyping circuits and soldering. <br/>
                        I write code for ESP32 and Arduino microcontrollers.
                    </p>
                    <p>
                        From time to time I also compose music and try drawing.
                        I'm quite good at editing videos too.                        
                    </p>
                </section>

                <section>
                    <h1 id="personality">Personality</h1>
                    <p>
                        I'm very introverted and don't talk much, but if you ask me the right questions expect
                        everything to suddenly change.
                    </p>

                    <p>
                        I value peace and silence and often like to disconnect from 
                        the world and hyperfocus on something like coding.
                        
                        <noindex style={{color: "rgba(0, 0, 0, 0)"}}>
                            I'm also autistic btw :3
                        </noindex>
                    </p>
                </section>

                <section>
                    <h1 id="conclusion">Conclusion</h1>
                    <p>
                        Human.
                    </p>
                </section>
            </ArticlePage>
        </Page>
    );
}
