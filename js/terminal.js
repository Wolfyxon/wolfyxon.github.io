//This code is a complete mess

const mainDir = "assets/terminal/"
const fileTree = {
    "home": {
        "user": {
            //"README.html": "/home/user/README.html",
            "example.html":"/home/user/example.html",
            "tools":"/home/user/tools",
            "rules_of_the_universe":"/home/user/rules_of_the_universe",
            "linux":"/home/user/linux"
        }
    }
}
const ignoredNames = ["index.html"]
const homedir = "/home/user"
var current_path = homedir
var current_dir = fileTree.home.user

function formatPath(path) {
    if (!path.startsWith(mainDir)) {
        path = mainDir + path
    }
    path = path.replace("~/", homedir)
    path = path.replaceAll("//", "/")
    return path
}

let read = (file) => new Promise((resolve, reject) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true)
    var res = null
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                res = rawFile.responseText
                resolve(res)
            }
        }
    }
    rawFile.send(null);
})

function dictUrl(url, dict, char = "/") {
    if (url.startsWith(char)) url = url.replace(char, "")
    const steps = url.split(char)
    var currentDict = dict
    var finalValue = null
    for (var i = 0; i < steps.length; i++) {
        const val = currentDict[steps[i]]
        if (val === undefined) {
            return null
        }
        if (i == steps.length - 1) {
            finalValue = val
        } else {
            if (val instanceof Object) {
                currentDict = val
            } else return null
        }
    }
    return finalValue
}

function getFilesAndDirs(path) {
    //TODO: support for .. (upper dirs)
    var dir = current_path
    if (path === undefined) {
        path = dir
    }
    if (!path.startsWith("/")) {
        dir = (current_path + "/" + path)
    } else {
        dir = path
    }


    if (dir == "/") return fileTree
    else {
        if (dir.startsWith("/")) {
            dir = dir.replace("/", "")
        }
    }
    var dirDict = dictUrl(dir, fileTree)
    return dirDict
}



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
        if ((i / 4 + 1) % canvas.width == 0) {
            asciiArt += "<br>"
        }
    }
    return asciiArt
}

window.addEventListener("load", async function () {
    const terminal = document.getElementById("terminal")
    const input = document.getElementById("terminal-input")
    const tconsole = document.getElementById("terminal-console")
    const prefix = document.getElementById("terminal-prefix")

    function echo(text, allowHTML = false, color = "white") {
        if (text.includes("\n")) {
            const split = text.split("\n")
            for (var i = 0; i < split.length; i++) {
                echo(split[i], allowHTML, color)
            }
            return
        }

        const elem = document.createElement("pre")
        tconsole.appendChild(elem)
        elem.style.color = color
        if (allowHTML) {
            elem.innerHTML = text
        } else {
            elem.textContent = text
        }

        setTimeout(function () {

        }, 50)

    }

    const commands = {
        "help": ["Shows a list of commands", function (args) {
            for (const [key, value] of Object.entries(commands)) {
                echo(key + ": " + value[0])
            }
        }],
        "echo": ["Prints a message", function (args) {
            echo((args.filter(item => item !== args[0])).join(" "))
        }],
        "htmlecho": ["Prints HTML",function (args){
            echo((args.filter(item => item !== args[0])).join(" "),true)
        }],
        "ls": ["Lists files and directories in current directory", function (args) {
            dirDict = getFilesAndDirs(args[1])
            if (dirDict !== undefined ){
                if(typeof dirDict != "object") return
                for (const [key, value] of Object.entries(dirDict)) {
                    if (typeof value === "string" || value instanceof String) {
                        echo(key)
                    } else {
                        echo(key, false, "dodgerblue")
                    }
                }
            } else {
                if (args.length > 1) echo("ls: cannot access '" + args[1] + "': No such file or directory")
            }
        }],
        "cd": ["Jumps into a directory", function (args) {
            var path = current_path
            if (args.length > 1) path = args[1]
            if (path.includes("..")) {
                const split = path.split("/")
                for (var i = 0; i < split.length; i++) {
                    if (split[i] == "..") {
                        const slashSplit = current_path.split("/")
                        const tmp = current_path.split(slashSplit[slashSplit.length - 1])[0]
                        const tmpDict = getFilesAndDirs(tmp)
                        if (tmpDict) current_path = tmp
                    }
                }
            } else {
                const dir = getFilesAndDirs(path)

                if (dir) {
                    if(typeof dir != "object"){
                        echo("bash: cd: "+path+": Not a directory")
                        return
                    }
                    if (path.startsWith("/")) current_path = path
                    else current_path = current_path + "/" + path
                    current_dir = dir
                } else {
                    echo("bash: cd: " + path + ": No such file or directory")
                }
            }
            var tmp = current_path.replaceAll("//", "/")
            if (current_path == homedir) tmp = "~"
            else {
                if (tmp != "/") {
                    const split = tmp.split("/")
                    tmp = split[split.length - 1]
                }
            }
            document.getElementById("terminal-path").textContent = tmp
        }],
        "cat": ["Reads a text file. Use --html flag to enable HTML formatting", async function (args) {
            var path
            const validFlags = ["--html"]
            for (var i = 1; i < args.length; i++) {
                const arg = args[i]
                if (arg.startsWith("--")) {
                    if (!validFlags.includes(arg)) {
                        echo("cat: unrecognized option '" + arg + "'")
                        return
                    }
                } else {
                    if (path === undefined) path = arg
                }
            }
            const dir = getFilesAndDirs(path)
            if (dir) {
                if (typeof dir == "string") {
                    const content = await read(mainDir+"/"+dir)
                    echo(content,args.includes("--html"))
                } else {
                    echo("cat: " + path + ": Is a directory")
                }

            }


        }],
        "reboot":["Reloads the page",function (){window.location.href = window.location.href}],
        "clear": ["Clears screen", function (args) {
            tconsole.innerHTML = ""
        }],
        "neofetch": ["I use arch btw", async function (args) {
            //TODO: browser icon ASCII art and name
            echo(await read(mainDir + "/neofetch.html"), true, "cyan")
        }],
        "badapple":["Proves 2nd rule of the universe", function (args){
            echo("<video class='hidden' id='source-video'><source src='./assets/video/bad_apple.mp4' type='video/mp4'></video> <canvas class='hidden' id='canvas-video'></canvas>",true)
            echo("<div id='ascii'></div>",true)
            const video = document.getElementById("source-video")
            const canvas = document.getElementById("canvas-video")
            const ascii = document.getElementById("ascii")
            video.play()

            const itv = setInterval(function (){
                const ctx = canvas.getContext("2d")
                ctx.drawImage(video,0, 0, video.videoWidth/1.5, video.videoHeight/2)
                ascii.innerHTML = canvasToASCII(canvas)
            },10)
        }]
    }

    function run_command(input_command) {
        const args = input_command.split(" ")
        const command = args[0]
        if (command == "") return;
        if (command in commands) {
            commands[command][1](args)
        } else {
            echo("bash: " + args[0] + ": command not found")
        }
    }

    var pressed_keys = []


    input.onkeydown = function (event) {
        input.scrollIntoView()
        if (event.code == "Enter" || event.keyCode === 13) {
            const html = prefix.innerHTML.replace("id=\"terminal-path\"", "")
            const content = input.textContent
            echo(html + " <span id='tmp_command'></span>", true)
            const output = document.getElementById("tmp_command")
            output.textContent = content
            output.id = null

            input.textContent = ""
            setTimeout(function () {
                run_command(content)
            }, 10)


        }
    }
    input.focus()
    terminal.onclick = function (){
        input.focus()
    }
    setInterval(function () {
        if (terminal.style.visibility != "hidden") {
            if (input.innerHTML.includes("<br>")) input.innerHTML = input.innerHTML.replaceAll("<br>", "")
        }

    }, 1)

})