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
function echo(text) {
    const line = addAndGetLine()
    line.textContent = text
    return line
}
function echoInnerHTML(preHtml){
    const line = addAndGetLine();
    line.innerHTML = preHtml
    return line
}
function echoHTML(html) {
    const line = getTerminal()
    line.innerHTML += html
    return line
}

window.addEventListener("load", () => {

})