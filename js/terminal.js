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
    for(var i=0;i<args.length;i++){
        const arg = args[i];
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

function sigTerm(){
    unblock()
    getInput().value += "^C"
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
    echo("Hi, I'm Wolfyxon. A young male programmer from Poland. I mainly focus on making websites, tools and games.")
    echo("I also expand my skills outside the programming world, I can edit videos very well and I'm learning how to make music. I'm highly interested in psychology.")
    echoInnerHTML("I'm an open source fan and I like having full control over my system (aka. I'm a nerd) so I use <span class='cyan'>Arch Linux</span> operating system as a daily driver.")
    echo("I also like gaming. I like sandbox, strategy and shooter games.")
    echo("My favourite music genres are Metal, Rock, Dubstep and Orchestral.")
    echo("I'm an extroverted introvert INFJ. I prefer being and working alone but I can be very helpful and social in a group.")
    echo("I am always calm and avoid arguments at any cost. I sense people's emotions and know how to support them.")
    echoInnerHTML("I speak Pol<span class='red'>ish</span>, " +
        "fluent <span class='lightblue'>En<span class='white'>g<span class='red'>l</span>i</span>sh</span> and basic " +
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
    echo("Check out 'badapple'","orange")

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
        "- <span class='purple'>KaroleusPL</span> game developer, artist and composer <br>",

    "interests":
        "- Psychology <br>" +
        "- Military <br>" +
        "- Survival <br>" +
        "- Old tech",

    "hobbies":
        "- Coding <br>" +
        "- Gaming <br>" +
        "- Drawing <br>" +
        "- Listening to music <br>" +
        "- Editing videos",

    "ideology": "I hate myself, love others.",

    "musicians": "- My favourite music bands and composers: -<br><br>" +
        "Rock & Metal: <br>" +
        "- Rammstein <br>" +
        "- Korn <br>" +
        "- SABATON <br>" +
        "- System of Down <br>" +
        "- Tool <br>" +
        "- Limp Bizkit <br>" +
        "- Metalica <br>" +

        "Dubstep: <br>" +
        "- Kane Pixels <br>" +
        "- Marek Hemman <br>" +
        "- Clubroot <br>" +
        "- Mooryc <br>" +

        "Orchestral:<br>" +
        "- Hans Zimmer <br>" +
        "- Approaching Nirvana <br>" +

        "Other: <br>" +
        "- KaroleusPL <br>" +
        "- SKALD <br>" +
        "- Will Wood <br>" +
        "- Toby Fox <br>" +
        "- Imagine Dragons <br>" +
        "- Red Hot Chili Peppers <br>" +
        "- Kings of leon <br>" +
        "- Twenty One Pilots <br>",

    "ides":"- IDEs, game engines and code editors I use: -<br>" +
        "Game engines: <br>" +
        "- Godot <br>" +
        "- Roblox Studio <br>" +
        "Text editors: <br>" +
        "- nano <br>" +
        "- mousepad <br>" +
        "Code editors: <br>" +
        "- Visual Studio Code <br>" +
        "IDEs: <br>" +
        "- Webstorm <br>" +
        "- IntelIJ IDEA <br>" +
        "- PyCharm <br>" +
        "- CLion <br>",

    "software": "- Software I use or have experience with: - <br>" +
        "For programming related software, use 'cat ides' <br>" +
        "For games, use 'cat games' <br>" +
        "<br>" +
        "Drawing: <br>" +
        "- Krita <br>" +
        "- Aseprite <br>" +
        "Video editing: <br>" +
        "- KDEnlive <br>" +
        "- DaVinci Resolve <br>" +
        "Internet browsers: <br>" +
        "- Firefox [main browser] <br>" +
        "- Chromium <br>" +
        "- Chrome <br>" +
        "- Opera GX <br>" +
        "- Microsoft Edge <br>" +
        "Operating systems: <br>" +
        "- Arch Linux [main OS] <br>" +
        "- Ubuntu Linux <br>" +
        "- Kali Linux <br>" +
        "- Windows XP <br>" +
        "- Windows 7 <br>" +
        "- Windows 10 [secondary OS] <br>" +
        "Desktop environments: <br>" +
        "- i3 [main DE] <br>" +
        "- XFCE <br>" +
        "- Gnome <br>",

    "games":" - Games I play: - <br>" +
        "- Minecraft (Java Edition, New Nintendo 3DS Edition)<br>" +
        "- Roblox <br>" +
        "- Phasmophobia <br>" +
        "- sand:box <br>" +
        "- Pople Playground <br>" +
        "- Half Life (all games) <br>" +
        "- SCP: Secret Laboratory <br>" +
        "- Warzone 2100 <br>" +
        "- Mindustry <br>" +
        "- Undertale <br>" +
        "- Deltarune <br>",

    "DO_NOT_OPEN":"<a href='https://wolfyxon.github.io/DO_NOT_GO_TO_THIS_PAGE.html'>https://wolfyxon.github.io/DO_NOT_GO_TO_THIS_PAGE.html</a>"

}

function listFiles(hidden=false) {
    let res = []
    const entries = Object.entries(files)
    for(var i=0;i<entries.length;i++){
        const name = entries[i][0]
        if( hidden || (!name.startsWith(".") && !hidden) ) {
            res.push(name)
        }
    }
    res.sort()
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
    const files = listFiles( getFlags(args).includes("all") )
    let text = ""
    for(var i=0;i<files.length;i++){
        text += files[i] += " "
    }
    echo(text)

},"Lists files in the current directory")

registerCommand("reboot", function (){
    window.location.reload()
}, "Reloads the page")

registerCommand("badapple", function (){
    block(true)
    echo("If the playback is frozen, it's probably just loading. The conversion from video to ASCII art happens in real time.")

    echoInnerHTML("<video id='ba-video' style='display: none'><source src='../assets/video/bad_apple.mp4' type='video/mp4'></video>" +
        "<canvas id='ba-canvas' style='display: none'></canvas>")

    const text = echo("")
    text.className = "ba-text"

    const video = document.getElementById("ba-video")
    const canvas = document.getElementById("ba-canvas")

    video.play()

    const update = setInterval(function (){
        if(!blocked){
            clearInterval(update)
            echo("Interrupt signal received")
            video.remove()
            canvas.id = null;
            return
        }
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = video.videoWidth/6.5
        const height = video.videoHeight/8
        canvas.width = width
        canvas.height = height
        ctx.drawImage(video,0, 0, width, height)
        text.innerHTML = canvasToASCII(canvas)

    },10)

    echo("Type ^C and press ENTER to stop.")
},"Plays Bad Apple as an ASCII art animation")

function canvasToASCII(canvas) {
    //i hate javascript
    const ctx = canvas.getContext("2d")
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    var asciiArt = ""
    for (var i=0;i<data.length;i+= 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const brightness = (3*r + 4*g + b) >>> 3;
        if (brightness > 51) {
            asciiArt += "##"

        } else {
            asciiArt += "  "
        }
        if ((i / 4 + 1) % canvas.width === 0) {
            asciiArt += "<br>"
        }
    }
    return asciiArt
}
