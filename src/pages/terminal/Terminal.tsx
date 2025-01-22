import "./style.css"
import "../../css/animations.css"

import { useEffect } from "react"

function Terminal() {

    // TODO: Fix scripts adding multiple times for some reason
    useEffect(() => {
        function addScript(src: string) {
            const script = document.createElement("script");

            script.src = "/js/terminal/" + src;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            }
        }

        addScript("script.js");

        addScript("commands/help.js");
        addScript("commands/echo.js");
        addScript("commands/clear.js");
        addScript("commands/exit.js");
        addScript("commands/reboot.js");
        addScript("commands/dropbox-download.js");
        addScript("commands/badapple.js");
        addScript("commands/browserfetch.js");
        addScript("commands/base64-encode.js");
        addScript("commands/base64-decode.js");
    })

    return (
        <div id="main">
            <pre id="console"></pre>
            <div id="input-container">
                 <label id="prompt" htmlFor="input">[<span style={{"color": "red"}}>root</span>@<span style={{"color": "#924BFF"}}>wolfyxon</span> <span className="dir">/</span>]#</label>
                 <input type="text" id="input" />
            </div>
        </div>
    )
}

export default Terminal