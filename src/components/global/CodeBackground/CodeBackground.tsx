import { readFileSync } from "fs";

import "./style.css";

export default function CodeBackground(props: {file: string}) {
    const code = readFileSync(props.file).toString();
    const lines = code.split("\n");

    return (
        <div className="code-background">
            {lines.map((line, i) => (
                <pre key={"code-bg-" + i}>
                    {line}
                </pre>
            ))}
        </div>
    )
}