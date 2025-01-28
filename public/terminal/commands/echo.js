registerCommand(
    new Command(["echo"])
    .setDescription("Prints text")
    .addArg("text...", "Text to show", true)

    .setCallback(async (ctx) => {
        echo(ctx.getArgsString());
    })
);