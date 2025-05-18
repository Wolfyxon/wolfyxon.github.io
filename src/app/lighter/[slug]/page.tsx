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
    }
}

export async function generateStaticParams() {
    return Object.keys(tests).map(k => ({slug: k}));
}

export default async function LighterTestSlug(props: {params: any}) {
    const slug = (await props.params).slug as string;
    
    return <LighterTest test={tests[slug]} />;
}
