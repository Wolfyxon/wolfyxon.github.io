registerCommand(
    new Command(["base64-decode"])
    .setDescription("Decodes Base64 text")
    .addArg("base64...", "Base64 to decode", true)

    .setCallback(async (ctx) => {
        const base64 = ctx.getArgsString();
        echo(utils.base64.decode(base64));
    })
);