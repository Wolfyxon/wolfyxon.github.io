/* --== Getters ==-- */

function getConsole() {
    return document.getElementById("console");
}

function getPrompt() {
    return document.getElementById("prompt");
}

function getInput() {
    return document.getElementById("input");
}

/* --== Printing ==-- */

function echoHTML(html) {
   getConsole().innerHTML += html;
}

function echo(text) {
    const pre = document.createElement("pre");
    pre.innerText = text;

    getConsole().append(pre);
}
