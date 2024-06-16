registerCommand(
    new Command(["clear", "cls"])
    .setDescription("Clears the console")

    .setCallback(function(ctx) {
        getConsole().innerHTML = "";
    })
);