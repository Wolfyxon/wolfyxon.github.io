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
function echo(text, colorClass="white", inline=false) {
    const line = addAndGetLine()
    line.textContent = text
    line.className = colorClass
    if(inline) line.style.display = "inline-block"
    return line
}
// Adds a <pre> with the specified HTML or text to the output
function echoInnerHTML(preHtml, colorClass="white", inline=false){
    const line = addAndGetLine();
    line.innerHTML = preHtml
    line.className = colorClass
    if(inline) line.style.display = "inline-block"
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
    const amt = getTerminal().children.length
    for(var i=0;i<amt;i++){
        getTerminal().children[0].remove()
    }
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

function sendCommand(){
    const cmd = getInput().value
    echo(document.getElementById("prompt-pre").textContent+cmd)
    if(cmd === "") return
    getInput().value = ""
    const alias = cmd.split(" ")[0]
    if(commandExists(alias)) executeText(cmd)
    else echo("bash: "+alias+": command not found")
}

window.addEventListener("load", () => {
    getInput().addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendCommand()
        }
    })

    echoInnerHTML("<center>__        _____  _     _______   ____  _____  _   _ <br>" +
             "\\ \\      / / _ \\| |   |  ___\\ \\ / /\\ \\/ / _ \\| \\ | |<br>" +
             " \\ \\ /\\ / / | | | |   | |_   \\ V /  \\  / | | |  \\| |<br>" +
             "  \\ V  V /| |_| | |___|  _|   | |   /  \\ |_| | |\\  |<br>" +
             "   \\_/\\_/  \\___/|_____|_|     |_|  /_/\\_\\___/|_| \\_|</center><br>","red")
    echoInnerHTML("<center>Young passionate programmer</center>","purple")
    echo(" ")
    echo("Hi, I'm Wolfyxon. A young programmer from Poland. I mainly focus on making websites, tools and games.")
    echo("I also expand my skills outside the programming world, I can edit videos very well and I'm learning how to make music.")
    echoInnerHTML("I'm an open source fan and I like having full control over my system (aka. I'm a nerd) so I use <span class='cyan'>Arch Linux</span> operating system as a daily driver.")
    echo("I also like gaming. I like sandbox, strategy and shooter games.")
    echo("My favourite music genres are Metal, Rock, Dubstep and Orchestral.")
    echo("I'm an extroverted introvert INFJ. I prefer being and working alone but I can be very helpful and social in a group.")
    echo("I am always calm and avoid arguments at any cost. I sense people's emotions and know how to support them.")
    echo(" ")

    echo("- Programming languages: -","silver")
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
    echo("- Layout and style languages: -","silver")
    echo("Markdown ","red",true)
    echo("HTML5 ","orange",true)
    echo("CSS ","lightblue",true)
    echo("XML ","lime",true)
    echo(" ")
    echo("- Database languages: -","silver")
    echo("SQLite ","cyan",true)
    echo("MySQL ","lightblue",true)

    echo(" ")

})



registerCommand("echo", (args) => {
    echo(args.join(" "))
})
registerCommand("clear", clear)