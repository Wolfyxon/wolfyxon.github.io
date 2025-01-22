const browserColors = {
    "Firefox": "#FF5F2F",
    "Chromium": "#4F89C5",
    "Chrome": "#0D9853",
    "Edge": "#35C2B3",
    "Edge Legacy": "#0074D0",
    "Opera": "#F71A2D",
    "Safari": "#12ABEB",
    "Internet Explorer": "#006BB2",
}

registerCommand(
    new Command(["browserfetch"])
    .setDescription("Get info about the browser")

    .setCallback(async (ctx) => {
        const browser = utils.getBrowserName();

        const tmpWait = echo("Requesting browser ASCII arts...");

        const asciis = JSON.parse(await utils.httpGet("/js/terminal/browserAsciiArts.json"));
        const ascii = asciis[browser] || "";
        const color = browserColors[browser] || "";

        tmpWait.remove();

        let html = "";
        let text = "";

        function addSide(sideHtml) {
            html += `<div style="display: inline-block; vertical-align: top;">${sideHtml}</div>`;
        }

        function addText(txt) {
            text += `<div> ${txt}</div>`;
        }

        function addEntry(name, value) {
            addText(`<span style="color: ${color};">${name}: </span><span>${value}</span>`);
        }

        addText(`<span style="color: ${color};">root</span>@<span style="color: ${color};">wolfyxon</span>`);
        addText("--------------------")

        addEntry("Browser", browser);
        addEntry("User agent", navigator.userAgent);
        addEntry("OS", navigator.platform);
        addEntry("Language", navigator.language);
        addEntry("Resolution", window.screen.availWidth + "x" + window.screen.availHeight);
        addEntry("Internet access", navigator.onLine);
        addEntry("Do not track", navigator.doNotTrack);
        addEntry("Hardware concurrency", navigator.hardwareConcurrency);
        addEntry("Max touch points", navigator.maxTouchPoints);

        addSide(ascii);
        addSide(text);

        echoWithHTML(html);
    })
);