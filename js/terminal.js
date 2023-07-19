function getTerminal() {
    return document.getElementById("terminal")
}
function getInput() {
    return document.getElementById("cmd-input")
}
function getPrompt() {
    return document.getElementById("prompt-pre")
}

function addAndGetLine() {
    const pre = document.createElement("pre")
    getTerminal().appendChild(pre)
    return pre
}
// Adds a <pre> with the specified non-HTML text to the output
function echo(text, colorClass="white", inline=false, bold=false) {
    const line = addAndGetLine()
    line.textContent = text
    line.className = colorClass
    if(inline) line.style.display = "inline-block"
    if(bold) line.style.fontWeight = "bold"
    return line
}
// Adds a <pre> with the specified HTML or text to the output
function echoInnerHTML(preHtml, colorClass="white", inline=false, bold=false){
    const line = addAndGetLine();
    line.innerHTML = preHtml
    line.className = colorClass
    if(inline) line.style.display = "inline-block"
    if(bold) line.style.fontWeight = "bold"
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

function clear(){
    getTerminal().innerHTML = ""
}

function commandExists(alias) {
    return commands[alias] !== undefined
}

function execute(alias, args=[]) {
    if(!commandExists(alias)) {
        console.error("'"+alias+"' command not found")
        return
    }
    const cmd = commands[alias]
    const runner = cmd.runner
    if( typeof runner == "string") {
        echoInnerHTML(runner)
        return;
    }
    if( typeof runner == "function" ) {
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


let blocked = false
let unblockOnTerm = false

function block(allowTerm=false) {
    blocked = true
    unblockOnTerm = allowTerm
    getPrompt().style.display = "none";
}
function unblock() {
    blocked = false
    getPrompt().style.display = "inline-block"
}

function sendCommand(cmd){
    const preHtml = getPrompt().innerHTML
    scrollToInput()
    if(cmd === "") {
        echoInnerHTML(preHtml)
        return
    }
    echoInnerHTML(preHtml,"",true)
    echo(cmd,"",true)
    getInput().value = ""
    const alias = cmd.split(" ")[0]
    if(commandExists(alias)) executeText(cmd)
    else echo("bash: "+alias+": command not found")

}

function sendCommandFromInput(){
    if(blocked) {
        echo(getInput().value)
        if(getInput().value === "^C") {
            unblock()
        }
        getInput().value = ""
        return
    }
    sendCommand(getInput().value)
}

function scrollToInput(){
    getInput().scrollIntoView({block: "nearest"})
}
function focusInput(){
    getInput().focus()
}

window.addEventListener("load", () => {
    getInput().addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendCommandFromInput()
        }
    })
    focusInput()
    clear()
    echoInnerHTML("<center>/=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\</center>","gray")
    echoInnerHTML("<center>__        _____  _     _______   ____  _____  _   _ <br>" +
             "\\ \\      / / _ \\| |   |  ___\\ \\ / /\\ \\/ / _ \\| \\ | |<br>" +
             " \\ \\ /\\ / / | | | |   | |_   \\ V /  \\  / | | |  \\| |<br>" +
             "  \\ V  V /| |_| | |___|  _|   | |   /  \\ |_| | |\\  |<br>" +
             "   \\_/\\_/  \\___/|_____|_|     |_|  /_/\\_\\___/|_| \\_|</center><br>","red")
    echoInnerHTML("<center>Young passionate programmer</center>","purple")
    echoInnerHTML("<center>\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/</center>","gray")

    echo(" ")

    echoInnerHTML("<center> <a href='https://github.com/Wolfyxon' class='lime'>GitHub</a> " +
        "<a href='https://youtube.com/@Wolfyxon' class='red'>YouTube</a> " +
        "<a href='https://twitter.com/@Wolfyxon' class='lightblue'>Twitter</a> " +
        "<a href='https://discord.gg/RztUGCK' class='purple'>Discord</a> " +
        "</center>")

    echo(" ")
    echo("- Something about me: -","red")
    echo("Hi, I'm Wolfyxon. A young programmer from Poland. I mainly focus on making websites, tools and games.")
    echo("I also expand my skills outside the programming world, I can edit videos very well and I'm learning how to make music.")
    echoInnerHTML("I'm an open source fan and I like having full control over my system (aka. I'm a nerd) so I use <span class='cyan'>Arch Linux</span> operating system as a daily driver.")
    echo("I also like gaming. I like sandbox, strategy and shooter games.")
    echo("My favourite music genres are Metal, Rock, Dubstep and Orchestral.")
    echo("I'm an extroverted introvert INFJ. I prefer being and working alone but I can be very helpful and social in a group.")
    echo("I am always calm and avoid arguments at any cost. I sense people's emotions and know how to support them.")
    echoInnerHTML("I speak Pol<span class='red'>ish</span>, " +
        "fluent <span class='lightblue'>En<span class='red'>g<span class='white'>l</span>i</span>sh</span> and basic " +
        "<span class='gray'>Ge</span><span class='red'>rm</span><span class='gold'>an</span>.")
    echo(" ")

    echo("- Programming languages: -","red")
    echo("C ","cyan",true)
    echo("C++ ","lightblue",true)
    echo("C# ","magenta",true)
    echo("Java ","gold",true)
    echo("JavaScript ","yellow",true)
    echo("GDScript ","lightblue",true)
    echo("Lua ","blue",true)
    echo("Python ","yellow",true)
    echo("Bash","silver",true)
    echo(" ")
    echo("- Layout and style languages: -","red")
    echo("Markdown ","silver",true)
    echo("HTML5 ","orange",true)
    echo("CSS ","lightblue",true)
    echo("XML ","lime",true)
    echo(" ")
    echo("- Database languages: -","red")
    echo("SQLite ","cyan",true)
    echo("MySQL ","lightblue",true)

    echo(" ")

    echo("Use 'help' to show a command list","yellow")
    echo("Use 'ls' to list files (additional info)","lime")
    echo("Use 'cat <file name>' to read a file","cyan")

    echo(" ")

})


registerCommand("help", (args) => {
    const entries = Object.entries(commands)
    for(var i=0;i<entries.length;i++){
        const alias = entries[i][0]
        const cmd = commands[alias]
        echo(alias+": "+cmd.description)
    }
}, "Lists commands and their descriptions")

registerCommand("echo", (args) => {
    echo(args.join(" "))
},"Prints text")
registerCommand("clear", clear,"Clears the output")

const files = {
    "people_i_work_with":
        "- <span class='lime'>l299l</span> experienced programmer <br>" +
        "- <span class='purple'>KaroleusPL</span> game developer, artist and composer <br>"

}

function listFiles() {
    let res = []
    const entries = Object.entries(files)
    for(var i=0;i<entries.length;i++){
        res.push(entries[i][0])
    }
    return res
}

function fileExists(path) {
    return files[path] !== undefined
}

registerCommand("cat",function (args){
    const path = args[0]
    if(path === undefined) {
        echo("cat: no path specified")
        echoInnerHTML("<img src='assets/img/dingus.jpg' width='300px'>")
        return
    }
    const text = files[path]
    if(text === undefined) {
        echo("cat: "+path+": No such file or directory")
        return;
    }
    echoInnerHTML(text)

},"Reads contents of a text file (or shows a cute cat :3)")

registerCommand("ls", function (args){
    const files = listFiles()
    let text = ""
    for(var i=0;i<files.length;i++){
        text += files[i] += " "
    }
    echo(text)

},"Lists files in the current directory")