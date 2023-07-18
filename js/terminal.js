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

let commands = {}
function registerCommand(alias, runner, description="No description available") {
    commands[alias] = {
        runner: runner,
        description: description,
    }
}

function execute(alias, args=[]) {
    const cmd = commands[alias]
    if(cmd === undefined) {
        console.error("'"+alias+"' command not found")
        return
    }
    const runner = cmd.runner
    if( typeof runner == "string") {
        echoInnerHTML(runner)
        return;
    }
    if( typeof cmd.runner == "function" ) {
        runner(args)
        return;
    }
    console.error("No matching runner type")
}

function removeFlags(args) {
    let res = []
    for(var i=1;i<split.length;i++){
        const arg = split[i];
        if(!arg.startsWith("--"))  res.push(arg)
    }
    return res
}
function getFlags(args) {
    let res = []
    for(var i=1;i<split.length;i++){
        const arg = split[i];
        if(arg.startsWith("--")) res.push(arg.replace("--",""))
    }
    return res
}

function executeText(command) {
    const split  = command.split(" ")
    const alias = split[0]
    split.splice(0,1)
    execute(alias,split)
}

function sendCommand(){
    const cmd = getInput().value
    echo(document.getElementById("prompt-pre").textContent+cmd)
    if(cmd === "") return
    getInput().value = ""
    executeText(cmd)
}

window.addEventListener("load", () => {
    getInput().addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendCommand()
        }
    })
})



registerCommand("echo", (args) => {
    let text = ""
    for(var i=0;i++;i<args.length){
        text += args[i]+" "
    }
    echo(text)
})