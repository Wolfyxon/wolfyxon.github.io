registerCommand(
    new Command(["help", "?"])
    .setDescription("Shows help or a command usage")

    .addArg("command", "The command you want to see the usage of")

    .setCallback(async (ctx) => {
        const cmdName = ctx.getArg("command");

        if(cmdName) {
            const cmd = getCommand(cmdName);
            if(!cmd) {
                echo("help: " + cmdName + ": command not found");
                return;
            }

            echo(cmd.aliases + ": " + cmd.description)
            echo(" ");

            let txt = cmd.aliases + " ";
            for(const arg of cmd.args) {
                if(arg.required) {
                    txt += "<";
                } else {
                    txt += "[";
                }

                txt += arg.name;

                if(arg.required) {
                    txt += ">";
                } else {
                    txt += "]";
                }
                
                txt += " ";
            }

            echo("Usage: ");
            echo("   "+ txt);
            echo(" ");
            echo("Arguments:")

            for(const arg of cmd.args) {
                echo("   " + arg.name + ": " + arg.description);
            }

        } else {
            echo("Super nerdy Wolfyxon terminal.");
            echo("Look into the code to learn how to hack into the terminal and make your own commands.");
            echo(" ");
            echo("Available commands:");

            for(const cmd of commands) {
                echo("  " + cmd.aliases + ": " + cmd.description);
            }

            echo(" ");
        }
    })
);