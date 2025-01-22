registerCommand(
    new Command(["base64-encode"])
    .setDescription("Encodes text in the Base64 format")
    .addArg("text...", "Text to encode", true)

    .setCallback(async (ctx) => {
        const text = ctx.getArgsString();
        echo(utils.base64.encode(text));
    })
);