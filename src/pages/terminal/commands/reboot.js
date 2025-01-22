registerCommand(
    new Command(["reboot"])
    .setDescription("Reloads the page")

    .setCallback(async (ctx) => {
        window.location.reload();
    })
);