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

function getBrowserName() {
    const names = {
        "Edge": (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) && (navigator.userAgent.indexOf("Edg") !== -1),
        "Opera": (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        "Firefox": typeof InstallTrigger !== 'undefined',
        "Safari": /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)),
        "Internet Explorer": !!document.documentMode,
        "Edge Legacy": !(!!document.documentMode) && !!window.StyleMedia,
        "Chrome": (!!window.chrome || navigator.userAgent.indexOf("Chrome") !== -1) && (!!window.chrome.webstore || !!window.chrome.runtime),
        "Chromium": (!!window.chrome || navigator.userAgent.indexOf("Chrome") !== -1),
    };

    for (const name in names) {
        if (names.hasOwnProperty(name)) {  // Check if the property is directly on the object, not inherited
            const condition = names[name];
            if (condition) {
                return name;
            }
        }
    }
    return "Unknown";
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
function echoHTML(preHtml, colorClass="white", inline=false, bold=false){
    const line = addAndGetLine();
    line.innerHTML = preHtml
    line.className = colorClass
    if(inline) line.style.display = "inline-block"
    if(bold) line.style.fontWeight = "bold"
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
    if( typeof runner === "string") {
        echoHTML(runner)
        return;
    }
    if( typeof runner === "function" ) {
        runner(args)
        return;
    }
    console.error("No matching runner type")
}

function removeFlags(args) {
    let res = []
    for(let i=1;i<split.length;i++){
        const arg = split[i];
        if(!arg.startsWith("--"))  res.push(arg)
    }
    return res
}
function getFlags(args) {
    let res = []
    for(let i=0;i<args.length;i++){
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
    if(cmd === "") return
    const alias = cmd.split(" ")[0]
    if(commandExists(alias)) executeText(cmd)
    else echo("bash: "+alias+": command not found")
    getInput().value = ""
}

function broadcastInput(clear=true){
    const preHtml = getPrompt().innerHTML
    scrollToInput()
    const cmd = document.createElement("pre")
    cmd.textContent = getInput().value
    cmd.style.display = "inline-block"
    echoHTML(preHtml,"",false).appendChild(cmd)

    if(clear) getInput().value = ""
}

function sigTerm(){
    unblock()
    getInput().value += "^C"
    broadcastInput()
    getInput().value = ""
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
    broadcastInput(false)
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
    getInput().addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "c"){
            sigTerm()
        }
    })

    focusInput()
    clear()
    echoHTML("<div class='center'>/=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\</div>","gray")
    echoHTML("<div class='center'>__        _____  _     _______   ____  _____  _   _ <br>" +
             "\\ \\      / / _ \\| |   |  ___\\ \\ / /\\ \\/ / _ \\| \\ | |<br>" +
             " \\ \\ /\\ / / | | | |   | |_   \\ V /  \\  / | | |  \\| |<br>" +
             "  \\ V  V /| |_| | |___|  _|   | |   /  \\ |_| | |\\  |<br>" +
             "   \\_/\\_/  \\___/|_____|_|     |_|  /_/\\_\\___/|_| \\_|</div><br>","red")
    echoHTML("<div class='center'>Young passionate programmer</div>","purple")
    echoHTML("<div class='center'>\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/</div>","gray")

    echo(" ")

    echoHTML("<div class='center'> <a href='https://github.com/Wolfyxon' class='lime'>GitHub</a> " +
        "<a href='https://youtube.com/@Wolfyxon' class='red'>YouTube</a> " +
        "<a href='https://twitter.com/@Wolfyxon' class='lightblue'>Twitter</a> " +
        "<a href='https://discord.gg/RztUGCK' class='purple'>Discord</a> " +
        "<a href='https://soundcloud.com/wolfyxon' class='orange'>SoundCloud</a>" +
        "</div>")

    echo(" ")
    echo("- Something about me: -","red")
    echo("I'm a young Polish programmer and gamer. I focus on making websites and tools, but I also have experience in gamedev.")
    echo("I'm also experienced in editing videos and audio and I can make basic models in Blender.")
    echo("I've also gotten into music production, I composed a few songs in LMMS and I'm currently learning how to play the piano.")
    echo("My favorite music genres are, Rock, Heavy Metal, Dubstep and Orchestral.")
    echo("Personally I'm an introvert and prefer working alone.")
    echoHTML("I speak Pol<span class='red'>ish</span>, " +
        "fluent <span class='lightblue'>En<span class='white'>g<span class='red'>l</span>i</span>sh</span> and basic " +
        "<span class='gray'>Ge</span><span class='red'>rm</span><span class='gold'>an</span>.")
    echo(" ")

    echo("- Projects -", "red")
    echoHTML('<a href="https://github.com/Wolfyxon/ItemLimiter">ItemLimiter</a> - a Minecraft Spigot plugin that limits some properties and NBT data of items to prevent shulker and book banning.')
    echoHTML('<a href="https://github.com/Wolfyxon/godot-BetterEditorPlugin">Godot Better EditorPlugin</a> - an improved EditorPlugin for more access to the Godot Engine plugin API.')
    echoHTML('<a href="https://www.roblox.com/games/10748929809/">The Great Doors of Door</a> - a parody Robolx game of DOORS that turned into something bigger.')
    echoHTML('<a href="https://wolfyxon.github.io/3ds-web-stuff/">3DS web stuff</a> - a collection of browser games designed specifically for the Nintendo 3DS.')
    echoHTML('<a href="https://github.com/Wolfyxon/MinVideo">MinVideo</a> - Minimal easy to understand and implement video format.')

    echo(" ")

    echo("- Programming languages: -","red")
    echo("Rust ","orange",true)
    echo("C ","cyan",true)
    echo("C++ ","lightblue",true)
    echo("C# ","magenta",true)
    echo("Java ","gold",true)
    echo("TypeScript ","lightblue",true)
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
    for(let i=0;i<entries.length;i++){
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
        "1. Technology <br>" +
        "2. Maps and geography <br>" +
        "3. Language history <br>" +
        "4. Space & science <br>" +
        "5. History <br>" +
        "6. Survival techniques",

    "hobbies":
        "1. Programming <br>" +
        "2. Gaming <br>" +
        "3. Music production <br>" +
        "4. Vido editing <br>" +
        "5. Drawing",

    "musicians": "- My favourite music bands and composers, and their best songs (may change from time to time): -<br><br>" +
        "Rock & Metal: <br>" +
        "- Rammstein: Mein Land <br>" +
        "- Korn: (hard to tell, all are nice) <br>" +
        "- SABATON: Father <br>" +
        "- System of Down: IEAIAIO <br>" +
        "- Linkin Park: Faint <br>" +
        "- Coma: Osobowy <br>" +
        "- Tool: Schism <br>" +
        "- Limp Bizkit: Nookie <br>" +
        "- Metalica: If Darkness Had a Son <br>" +

        "Dubstep: <br>" +
        "- Kane Pixels: Active Field <br>" +
        "- Marek Hemman: Lindwurm <br>" +
        "- Clubroot: The Straight And Narrow <br>" +
        "- Mooryc: Dive <br>" +

        "Orchestral: <br>" +
        "- Hans Zimmer: Interstellar - The Docking Scene <br>" +
        "- Approaching Nirvana: Dunegon Of Deceit <br>" +

        "Other: <br>" +
        "- KaroleusPL: Hide In The Dark (not public) <br>" +
        "- Hakita: War <br>" +
        "- KEYGEN CHURCH: Tenebre Rosso Sangue <br>" +
        "- SKALD: Ó Valhalla <br>" +
        "- Will Wood: Laplace's Angel <br>" +
        "- Toby Fox: BIG SHOT <br>" +
        "- Imagine Dragons: Sharks <br>" +
        "- Red Hot Chili Peppers: Can't Stop <br>" +
        "- Kings of Leon: Closer <br>" +
        "- Twenty One Pilots: No Chances <br>",

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
        "- IntelIJ IDEA <br>",

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
    for(let i=0;i<entries.length;i++){
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
        echoHTML("<img src='assets/img/dingus.jpg' width='300px'>")
        return
    }
    const text = files[path]
    if(text === undefined) {
        echo("cat: "+path+": No such file or directory")
        return;
    }
    echoHTML(text)

},"Reads contents of a text file (or shows a cute cat :3)")

registerCommand("ls", function (args){
    const files = listFiles( getFlags(args).includes("all") )
    let text = ""
    for(let i=0;i<files.length;i++){
        text += files[i] += " "
    }
    echo(text)

},"Lists files in the current directory")

registerCommand("reboot", function (){
    window.location.reload()
}, "Reloads the page")

registerCommand("badapple", function (args){
    block(true)
    echo("If the playback is frozen, it's probably just loading. The conversion from video to ASCII art happens in real time.")

    echoHTML("<video id='ba-video' style='display: none'><source src='../assets/video/bad_apple.mp4' type='video/mp4'></video>" +
        "<canvas id='ba-canvas' style='display: none'></canvas>")

    const text = echo("")
    text.className = "ba-text"

    const video = document.getElementById("ba-video")
    const canvas = document.getElementById("ba-canvas")

    video.play()

    function stop(){
        video.remove()
        canvas.remove()
        clearInterval(update)
        unblock()
    }
    video.onended = stop
    const update = setInterval(function (){
        if(!blocked){
            echo("Interrupt signal received")
            stop()
            return
        }
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = video.videoWidth/6.5
        const height = video.videoHeight/8
        canvas.width = width
        canvas.height = height
        ctx.drawImage(video,0, 0, width, height)
        text.innerHTML = canvasToASCII(canvas,args[0])

    },10)

    echo("Press CTR+C or type ^C and press ENTER to stop.")
},"Plays Bad Apple as an ASCII art animation")

registerCommand("dropbox",async function (args){
    if(args.length === 0){
        echo("bash: direct-dropbox: No URL specified. Use with --help for details")
        return;
    }
    if(args[0].toLowerCase() === "--help"){
        echo("Converts a DropBox link into a direct file download link.")
        echo("You can convert multiple links by separating them with spaces.")
        echo(" ")
        echo("How it works?")
        echo("yourString.replace(\"www.dropbox.com\",\"dl.dropboxusercontent.com\");")
        echo(" ")
        echo("It just replaces www.dropbox.com with dl.dropboxusercontent.com,")
        return;
    }

    const prefix = "www.dropbox.com"
    for(let i=0;i<args.length;i++){
        if(args[i].includes(prefix)){
            const url = args[i].replace(prefix,"dl.dropboxusercontent.com");
            echoHTML("<a href='"+url+"'>"+url+"</a>");
        } else {
            echo("bash: dropbox: Not a DropBox URL")
        }

    }
},"Converts a DropBox link into a direct file download link. Use with --help to see how it works. ")

registerCommand("neofetch",async function (){
    const asciis = JSON.parse(await httpGet("assets/browserASCIIArts.json"))
    let ascii = asciis[getBrowserName()]
    if(ascii === undefined) ascii = ""

    let html = "<div style='display: inline-block; vertical-align: top'>"+ascii+"</div> <div style='display: inline-block; vertical-align: top'>"


    const browserColors = {
        "Firefox":"#FF5F2F",
        "Chromium":"#4F89C5",
        "Chrome":"#0D9853",
        "Edge":"#35C2B3",
        "Edge Legacy":"#0074D0",
        "Opera":"#F71A2D",
        "Safari":"#12ABEB",
        "Internet Explorer":"#006BB2",
    }
    let color = browserColors[getBrowserName()]
    if(color === undefined) color = "#B8B8B8"

    function addHtml(htm){
        html += "<pre>"+htm+"</pre>"
    }

    function getColored(label){
        return "<span style='color: "+color+";'>"+label+"</span>"
    }

    function addEntry(label, value){
        addHtml(getColored(label)+": "+value)
    }

    addHtml(" ")
    addHtml(getColored("root")+"@"+getColored("wolfyxon"))
    addHtml("-------------")
    addEntry("OS",navigator.platform)
    addEntry("Browser",getBrowserName())
    //addEntry("User agent", navigator.userAgent)
    addEntry("Language", navigator.language)
    addEntry("Resolution",window.screen.availWidth+"x"+window.screen.availHeight)
    addEntry("Internet access",navigator.onLine)
    addEntry("Do not track",navigator.doNotTrack)

    const columns = 8
    const colors = [
        "black","darkred","limegreen","dodgerblue","mediumorchid","turquoise","whitesmoke",
        "dimgray","red","lime","deepskyblue","fuchsia","cyan","white"
    ]

    addHtml(" ")
    let colorHtml = ""
    for(let i=0;i<colors.length;i++){
        if(i===columns-1) colorHtml+="<br>"
        const col = colors[i]
        colorHtml += "<span style='background-color:"+col+"'>   </span>"
    }
    addHtml(colorHtml)

    html += "</div>"
    echoHTML(html)

},"Shows information about your browser")



function canvasToASCII(canvas,char) {
    if (char === undefined) char = "##"
    const ctx = canvas.getContext("2d")
    if(canvas.width === 0|| canvas.height === 0) return ""
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let asciiArt = ""
    for (let i=0;i<data.length;i+= 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const brightness = (3*r + 4*g + b) >>> 3;
        if (brightness > 51) {
            asciiArt += char
        } else {
            asciiArt += " ".repeat(char.length)
        }
        if ((i / 4 + 1) % canvas.width === 0) {
            asciiArt += "<br>"
        }
    }
    return asciiArt
}

async function httpGet(url){
    return new Promise(((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", url, true)
        let res = null
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status === 0) {
                    res = req.responseText
                    resolve(res)
                }
            }
        }
        req.send(null)
    }))
}