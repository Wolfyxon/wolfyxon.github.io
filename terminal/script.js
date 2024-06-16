let allowInput = true;
let commandActive = false;

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

/* --== Input processing ==-- */

function sendText(text) {
    if(!allowInput) return;
    let prefix = "";

    if(!commandActive) prefix = getPrompt().innerText;

    echo(prefix + " " + text);
}

window.addEventListener("load", () => {
    const input = getInput();
    
    window.addEventListener("keydown", (e) => {
        if(document.activeElement !== input) return;

        if(e.key == "Enter") {
            sendText(input.value);
        }
    });
});