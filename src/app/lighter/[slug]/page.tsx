import { Test } from "../Lighter";
import LighterTest from "../test/LighterTest";

import "../lighter.css";

const tests: {[slug: string]: Test} = {
    "test": {
        candidates: [
            {
                name: "A",
                icon: "/assets/media/img/ose/amogus.webp",
                answers: [-1, 1]
            },
            {
                name: "B",
                icon: "/assets/media/img/ose/john_xina.jpg",
                answers: [1, 1]
            }
        ],
        statements: [
            "Idk",
            "Hi"
        ]
    },

    "tgdod": {
        candidates: [
            {
                name: "Mr Wątroba",
                icon: "/assets/media/img/lighter/tgdod/MrWatroba.png",
                answers: [1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1]
            },
            {
                name: "Bonifacy",
                icon: "/assets/media/img/lighter/tgdod/Bonifacy.png",
                answers: [-1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1]
            },
            {
                name: "Glitcher",
                icon: "/assets/media/img/lighter/tgdod/Glitcher.png",
                answers: [1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1]
            },
            {
                name: "The Dark One",
                icon: "/assets/media/img/lighter/tgdod/DarkOne.png",
                answers: [-1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, -1]
            },
            {
                name: "The Bright One",
                icon: "/assets/media/img/lighter/tgdod/BrightOne.png",
                answers: [1, 1, -1, -1, 1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1]
            },
            {
                name: "Crystal Shogun",
                icon: "/assets/media/img/lighter/tgdod/crystalShogun.png",
                answers: [1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1]
            },
        ],
        statements: [
            "Piano lessons should be mandatory in all schools",
            "All computers should have antivirus software",
            "Dropping a piano on someone should be punished by death",
            "If someone stole my liver I would do anything to get it back",
            "We need to invest more into mining susonium caves",
            "Milk is great",
            "Potatoes possess great power and should be handled with caution",
            "We need to invest more in technology",
            "Light is unhealthy and wastes electricity",
            "You can live in the Weird Place quite peacefully",
            "Hats shouldn't be big",
            "Fedora hats should be more accessible",
            "Arch Linux is the best operating system",
            "You can leave the Weird Place without a liver",
            "If you believe strong enough, everything is going to be ok",
            "Always expect the Unexpected"
        ]
    }
}

export async function generateStaticParams() {
    return Object.keys(tests).map(k => ({slug: k}));
}

export default async function LighterTestSlug(props: {params: any}) {
    const slug = (await props.params).slug as string;
    
    return <LighterTest test={tests[slug]} />;
}
