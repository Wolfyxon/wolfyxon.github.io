registerCommand(
    new Command(["cd"])
    .setDescription("Changes the working directory")
    .addArg("path", "Directory path", false)
    
    .setCallback(async (ctx) => {
        const path = ctx.getArg("path") || "/";
        const res = await queryFs(path);

        if(!res) {
            echo(`cd: ${path}: No such file or directory`);
            return;
        }

        if(typeof(res) == "string") {
            echo(`bash: cd: ${path}: Not a directory`);
            return;
        }

        const split = path.split("/");

        if(path != "/") {
            for(let i = 0; i < split.length; i++) {
                const sub = split[split.length - 1 - i];
                if(sub != "") {
                    getDirText().innerText = sub;
                    break;
                }
            }
    
        } else {
            getDirText().innerText = path;
        }


        if(path.startsWith("/")) {
            currentDir = path;
        } else {
            currentDir = currentDir + path;
        }
    })
);