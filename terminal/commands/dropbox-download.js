registerCommand(
    new Command(["dropbox-download", "dropbox-dl", "drbx-dl"])
    .setDescription("Converts a Dropbox file link into a direct file download link.")
    
    .addArg("link", "File share link", true)

    .setCallback(async (ctx) => {
        const domain = "www.dropbox.com";
        const targetDomain = "dl.dropboxusercontent.com";

        const link = ctx.getArg("link");
        
        if(utils.urlStartsWith(link, targetDomain)) {
            echo("error: This already is a direct download link");
            return;
        }

        if(!utils.urlStartsWith(link, domain)) {
            echo("error: Not a Dropbox link");
            return;
        }

        const rep = utils.escapeHTML(link.replace(domain, targetDomain));

        echoHTML(`<a href="${rep}">${rep}</a>`);
    })
);