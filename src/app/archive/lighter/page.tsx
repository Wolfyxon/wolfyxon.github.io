import TextLink from "@/components/TextLink";

import "./lighter.css";

export default function LighterHomePage() {
    // TODO loading tests from here
    return (
        <>
            <h1>Lighter</h1>
            <a href="./tgdod">The Great Doors of Door</a>
            <p>
                This is a parody site of <TextLink>https://latarnikwyborczy.pl/</TextLink> where you can create custom political tests.
            </p>
        </>
    );
}