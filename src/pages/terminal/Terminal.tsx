import "../../js/utils.js"
import "./script.js"
import "./style.css"
import "../../css/animations.css"

function Terminal() {
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