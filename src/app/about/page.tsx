import type { Metadata } from "next";

import "../css/animations.css";
import "../css/article.css";

export const metadata: Metadata = {
    title: "About me - Wolfyxon",
    description: "Something about me",
};

export default function About() {
    return (
        <>
            <div className="fancy-section">
                <section>
                    <h1>Who am I</h1>
                    <p>
                        Hi, I'm Wolfyxon.
                    </p>
                    <p>
                        I'm a young programmer from Poland. <br />
                        I've been coding since I was 9 years old and it truly is my passion. 
                    </p>
                    <p>
                        The stuff I primarily make is tools, websites and games. 
                        I code for fun and enjoy learning new technologies.
                    </p>
                    <p>
                        I'm also a beginner musician. 
                        I compose digital music and sometimes play on a piano.
                    </p>
                    <p>
                        I'm also autistic btw.
                    </p>
                </section>

                <section>
                    <h1>Interests</h1>
                    <p>
                        Programming is my primary interest (a passion, actually) but I'm also into
                        composing music, video and audio editing, science and psychology.
                    </p>
                    <p>
                        I enjoy dealing with all kinds of software, especially if it provides a lot of control.
                        That's why I use Linux and a lot of open source tools. 
                    </p>
                </section>

                <section>
                    <h1>How I code</h1>
                    <p>
                        I'm definitely on the craft-based side of programmers.
                    </p>
                    <p>
                        I care a lot about code maintainability, structure, style, proper practices and performance.
                        I would call myself a perfectionist in that <br/>
                        (expect me to have a mental breakdown when looking at your code).
                    </p>
                </section>

                <section>
                    <h1>Personality</h1>
                    <p>
                        I'm a very introverted and a reserved person, but if you ask me the right questions expect me to
                        suddenly talk a lot.
                    </p>
                    <p>
                        I care a lot about justice, respect and doing the right things.
                    </p>
                </section>

                <section>
                    <h1>Conclusion</h1>
                    <p>
                        Human.
                    </p>
                </section>
            </div>
        </>
    );
}
