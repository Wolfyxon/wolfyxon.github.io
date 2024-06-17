registerCommand(
    new Command(["clear", "cls"])
    .setDescription("Clears the console")

    .setCallback(async (ctx) => {
        getConsole().innerHTML = "";
    })
);