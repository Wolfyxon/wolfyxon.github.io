if(!utils) throw "Utils not imported";

const global = {
    
    observer: new IntersectionObserver((entries, obs) => {
        for(const entry of entries) {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        }
    })
};

window.addEventListener("load", async () => {

    // Auto header and footer insertion
    const header = await utils.httpGet("/components/header.html");
    const footer = await utils.httpGet("/components/footer.html");

    document.body.innerHTML = header + document.body.innerHTML + footer;

    // Observe all elements with the 'observing' class
    for(const observing of document.getElementsByClassName("observing")) {
        global.observer.observe(observing);
    }
});