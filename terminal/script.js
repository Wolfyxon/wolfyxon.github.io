let allowInput = true;
let lastCommandCtx = null;

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

function isAnyCommandRunning() {
    return lastCommandCtx && lastCommandCtx.running;
}

/* --== Printing ==-- */

function echoHTML(html) {
   getConsole().innerHTML += html;
}

function echo(text, color) {
    const pre = document.createElement("pre");
    pre.innerText = text;
    pre.style.color = color || "";

    getConsole().append(pre);
    focusInput();

    return pre;
}


function promptEcho(text) {
    let prefix = "";
    if(!isAnyCommandRunning()) prefix = getPrompt().innerText;

    return echo(prefix + " " + text);
}

/* --== Command processing ==-- */

class CommandContext {
    constructor(command, args, flags) {
        this.argValues = {};
        this.command = command;
        this.args = args;
        this.flags = flags;
        this.running = true;

        for(let i = 0; i < args.length; i++) {
            const arg = args[i];
            const argInfo = this.command.args[i];
            if(!argInfo) break;

            this.argValues[argInfo.name] = arg;
        }
    }

    getArg(name) {
        return this.argValues[name];
    }

    getArgsString() {
        return this.args.join(" ");
    }

    quit() {
        this.running = false;
    }

    quitRequest() {
        if(this.command.onQuitRequest()) this.quit();
    }
}

class Command {
    constructor(aliases) {
        this.aliases = aliases;
        this.description = "";
        this.args = [];
        this.autoAcceptQuitRequest = true;
        this.onQuitRequest = () => { return this.autoAcceptQuitRequest; };
    }

    async callback() {
        echo("Unimplemented");
    }

    setOnQuitRequest(callback) {
        this.onQuitRequest = callback;

        return this;
    }
    
    setAutoAcceptQuitRequest(value) {
        this.autoAcceptQuitRequest = value;

        return this;
    }

    setDescription(description) {
        this.description = description;

        return this;
    }

    setCallback(callback) {
        this.callback = callback;

        return this;
    }

    addArg(name, description, required) {
        this.args.push({
            name: name,
            description: description,
            required: required
        });

        return this;
    }

    async execute(args, flags) {
        const ctx = new CommandContext(this, args, flags);
        lastCommandCtx = ctx;
        
        updatePrompt();

        let valid = true;
        for(let i = 0; i < this.args.length; i++) {
            const reqArg = this.args[i];
            console.log(reqArg)
            if(!reqArg.required) break;
            
            if(!args[i]) {
                if(valid) {
                    valid = false;

                    echo("error: Not enough arguments.");
                    echo("Required:");
                }

                echo(`  ${reqArg.name}: ${reqArg.description}`);
            }
        }

        if(valid) {
            try {
                await this.callback(ctx);
            } catch (e) {
                echo(`error: ${e.message}`);
                echo(" ");
                echo(e.stack);
                echo(" ");
                echo("This is a bug!");
            }
    
        }

        ctx.quit();

        updatePrompt();
    }
}

function updatePrompt() {
    const prompt =  getPrompt();

    if(isAnyCommandRunning()) {
       prompt.style.display = "none";
    } else {
        prompt.style.display = "";
    }
}

function registerCommand(command) {
    commands.push(command);
}

function getCommand(alias) {
    for(const cmd of commands) {
        if(cmd.aliases.includes(alias)) {
            return cmd;
        }
    }
}


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

    for(let i = 0; i < split.length; i++) {
        if(i === 0) continue;

        const param = split[i];

        if(param.startsWith("--")) {
            flags.push(param.replace("--", ""));
        } else {
            args.push(param);
        }
    }

    // Execute the command
    const alias = split[0];
    const cmd = getCommand(alias);
    
    if(cmd) {
        cmd.execute(args, flags);
    } else {
        echo(`bash: ${alias}: command not found`);
    }
}

/* --== Input processing ==-- */

function sigTerm() {
    promptEcho(getInput().value);

    getInput().value = "";

    if(isAnyCommandRunning()) {
        lastCommandCtx.quitRequest();
    }
}

function sendText(text) {
    if(text === "^C") {
        sigTerm();
        return;
    }

    if(!allowInput) return;
    let prefix = "";

    promptEcho(text);

    if(!isAnyCommandRunning()) execute(text);
}

function focusInput() {
    const input = getInput();
    input.focus();
    input.scrollIntoView();
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

        if(e.ctrlKey && e.key === "c") {
            getInput().value += "^C";
            sigTerm();
        }
    });

    document.getElementById("main").addEventListener("click", focusInput);

    echoHTML("<div style='color: red;'>" +
        "__        _____  _     _______   ____  _____  _   _ <br>" +
        "\\ \\      / / _ \\| |   |  ___\\ \\ / /\\ \\/ / _ \\| \\ | |<br>" +
        " \\ \\ /\\ / / | | | |   | |_   \\ V /  \\  / | | |  \\| |<br>" +
        "  \\ V  V /| |_| | |___|  _|   | |   /  \\ |_| | |\\  |<br>" +
        "   \\_/\\_/  \\___/|_____|_|     |_|  /_/\\_\\___/|_| \\_|</div><br>"
    );

    echo("Welcome to my super nerdy terminal", "#924BFF");
    echo(" ");
    echo("See `help` to get a list of commands", "lime");
    echo("Use `exit` to go back to the home page", "lime");
    echo(" ");
    echo("Check out `badapple`", "gold");
    echo(" ");
});