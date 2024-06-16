registerCommand(
    new Command(["clear", "cls"])
    
    .setCallback(function(ctx) {
        getConsole().innerHTML = "";
    })
);