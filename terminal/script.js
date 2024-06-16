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
    const chars = text.split("");
    if(chars.length === 0) return;

    // Split the string by spaces, " and '
    let split = [];
    let current = "";
    let strOpen = null;
    for(const char of chars) {
        if(char == "\"" || char == "'") {
            if(strOpen) {
                if(char == strOpen) {
                    strOpen = null;
                }
            } else {
                strOpen = char;
            }
        } else {
            if(char == " " && !strOpen) {
                split.push(current);
                current = "";
                continue;
            }
        }

        current += char;
    }

    if(strOpen) {
        echo(`error: Expected closing ${strOpen}`)
        return;
    }

    if(current != "") {
        split.push(current);
    }

    // Separate arguments from flags

    let args = [];
    let flags = [];

    for(const param of split) {
        if(param.startsWith("--")) {
            flags.push(param.replace("--", ""));
        } else {
            args.push(param);
        }
    }

    // Execute the command
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