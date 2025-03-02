import "./terminal.css";

export default function TerminalPage() {
    return (
        <>
            <pre id="console"></pre>
            <div id="input-container">
                 <label id="prompt" htmlFor="input">
                    [<span className="username">root</span>@<span className="hostname">wolfyxon</span> <span className="dir" id="dir">/</span>]#
                </label>

                 <input type="text" id="input" />
            </div>
        </>
    );
}