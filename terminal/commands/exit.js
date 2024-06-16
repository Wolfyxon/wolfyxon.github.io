registerCommand(
    new Command(["exit", "logout"])
    .setDescription("Quits the terminal and returns to the home page")
    
    .setCallback(function(ctx) {
        window.location.href = "/";
    })
);