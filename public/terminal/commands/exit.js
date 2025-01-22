registerCommand(
    new Command(["exit", "logout"])
    .setDescription("Quits the terminal and returns to the home page")
    
    .setCallback(async (ctx) => {
        window.location.href = "/";
    })
);