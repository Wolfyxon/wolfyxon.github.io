if(!utils) throw "Utils not imported";

const global = {
    
    observer: new IntersectionObserver((entries, obs) => {
        for(const entry of entries) {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        }
    })
};

window.addEventListener("load", async () => {

    // --== Auto header and footer insertion ==--

    // Prepare
    const header = document.createElement("header");
    const footer = document.createElement("footer");

    document.body.prepend(header);
    document.body.append(footer);

    // Request header and footer
    const headerHtml = await utils.httpGet("/components/header.html");
    header.innerHTML = headerHtml.replace("<header>", "").replace("</header>", "");

    const footerHtml = await utils.httpGet("/components/footer.html");
    footer.innerHTML = footerHtml.replace("<footer>", "").replace("</footer>", "");

    // --== Observe all elements with the 'observing' class ==--
    for(const observing of document.getElementsByClassName("observing")) {
        global.observer.observe(observing);
    }
});