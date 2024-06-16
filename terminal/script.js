let allowInput = true;
let commandActive = false;

const commands = [];

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


/* --== Command processing ==-- */

function execute(text) {    
    let split = [];

    const chars = text.split("");

    let current = "";
    let strOpen = null;
    for(const char of chars) {
        if(strOpen) {
            if(char == strOpen) strOpen = null;
        } else {
            if(char == "\"" || char == "'") {
                strOpen = char;
            }
        }
    }

    if(strOpen) {
        echo(`error: Expected closing ${strOpen}`)
        return;
    }

}

/* --== Input processing ==-- */

function sendText(text) {
    if(!allowInput) return;
    let prefix = "";

    if(!commandActive) prefix = getPrompt().innerText;

    echo(prefix + " " + text);

    if(!commandActive) execute(text);
}

function focusInput() {
    getInput().focus();
}

window.addEventListener("load", () => {
    const input = getInput();
    
    window.addEventListener("keydown", (e) => {
        if(document.activeElement !== input) return;

        if(e.key == "Enter") {
            const txt = input.value;
            input.value = "";
            sendText(txt);
        }
    });

    document.getElementById("main").addEventListener("click", focusInput);

    focusInput();
});