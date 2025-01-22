registerCommand(
    new Command(["cat", "read"])
    .setDescription("Reads contents of a text file")
    .addArg("path", "File path", false)
    
    .setCallback(async (ctx) => {
        const path = ctx.getArg("path");

        if(!path) {
            const img = document.createElement("img");
            img.style.width = "20%";
            img.src = "/assets/media/img/maxwell.jpg";
            getConsole().append(img);
            
            return;
        }

        const res = await queryFs(path);

        if(!res) {
            echo(`ls: cannot access '${path}': No such file or directory`);
            return;
        }

        if(typeof(res) != "string") {
            echo(`cat: ${path}: Is a directory`);
            return;
        }

        echo(res);
    })
);