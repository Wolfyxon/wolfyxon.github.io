function getConsole() {
    return document.getElementById("console");
}

function echoHTML(html) {
   getConsole().innerHTML += html;
}

function echo(text) {
    const pre = document.createElement("pre");
    pre.innerText = text;

    getConsole().append(pre);
}