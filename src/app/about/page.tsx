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
                    <p>
                        Hi, I'm Wolfyxon.
                    </p>
                    <p>
                        I'm a young programmer guy from Poland. <br />
                        I've been coding since I was 9 years old and it truly is my passion. 
                    </p>
                    <p>
                        The stuff I primarily make is tools, websites and games. 
                        I code for fun and enjoy learning new technologies.
                    </p>
                    <p>
                        I'm also a beginner musician. 
                        I compose digital music and sometimes play on a piano. 
                        
                        <span style={{color: "rgba(0, 0, 0, 0)"}}> I'm also autistic btw :3</span>
                    </p>
                </section>

                <section>
                    <h1 id="interests">Interests</h1>
                    <p>
                        Programming is my primary interest (a passion, actually) but I'm also into
                        composing music, video and audio editing, science and psychology.
                    </p>
                    <p>
                        I enjoy dealing with all kinds of software, especially if it provides a lot of control.
                        That's why I use Linux and a lot of open source tools. 
                    </p>
                    <p>
                        I like sandbox, strategy and shooter games.
                    </p>
                </section>

                <section>
                    <h1 id="how-i-code">How I code</h1>
                    <p>
                        I'm definitely on the craft-based side of programmers.
                    </p>
                    <p>
                        I care a lot about code maintainability, structure, style, proper practices and performance.
                        I would call myself a perfectionist in that <br/>
                        (expect me to have a mental breakdown when looking at your code).
                    </p>
                    <p>
                        Oh also don't look at my old projects please...
                    </p>
                </section>

                <section>
                    <h1 id="personality">Personality</h1>
                    <p>
                        I'm a very introverted and a reserved person, but if you ask me the right questions expect me to
                        suddenly talk a lot.
                    </p>
                    <p>
                        I care a lot about justice, respect and doing the right things.
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
