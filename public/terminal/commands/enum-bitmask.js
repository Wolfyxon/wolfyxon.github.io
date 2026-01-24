registerCommand(
    new Command(["enum-bitmask"])
    .setDescription("Turns a C enum into a bitmask enum")
    .addArg("source...", "Enum items separated with a comma")

    .setCallback(async (ctx) => {
        const enumSrc = ctx.getArgsString();

        if(!enumSrc) {
            echo("error: Enum source not specified");
            return;
        }

        const split = enumSrc.split(",");
        
        for(let i = 0; i < split.length; i++) {
            const item = split[i];

            echo(`${item.trim()} = (1 << ${i}),`);
        }
    })
);