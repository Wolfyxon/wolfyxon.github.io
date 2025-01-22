registerCommand(
    new Command(["ls"])
    .setDescription("Lists files in a directory")
    .addArg("path", "File or directory path", false)
    
    .setCallback(async (ctx) => {
        const path = ctx.getArg("path") || currentDir;
        const res = await queryFs(path);

        if(!res) {
            echo(`ls: cannot access '${path}': No such file or directory`);
            return;
        }

        let text = "";
        
        if(typeof(res) == "string") {
            const split = path.split("/");
            text = split[split.length - 1];
        } else {
            for(const fd of res) {
                text += fd + "  ";
            }
        }

        echo(text);
    })
);