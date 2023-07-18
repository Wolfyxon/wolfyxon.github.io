function getTerminal() {
    return document.getElementById("terminal")
}
function getInput() {
    return document.getElementById("cmd-input")
}

function addAndGetLine() {
    const pre = document.createElement("pre")
    getTerminal().appendChild(pre)
    return pre
}
// Adds a <pre> with the specified non-HTML text to the output
function echo(text) {
    const line = addAndGetLine()
    line.textContent = text
    return line
}
// Adds a <pre> with the specified HTML or text to the output
function echoInnerHTML(preHtml){
    const line = addAndGetLine();
    line.innerHTML = preHtml
    return line
}
// Adds an HTML code to the output
function echoHTML(html) {
    const line = getTerminal()
    line.innerHTML += html
    return line
}

window.addEventListener("load", () => {

})