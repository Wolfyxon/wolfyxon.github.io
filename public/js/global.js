// TODO: Migrate to react

if(!utils) throw "Utils not imported";

window.addEventListener("load", async () => {
    const observer = new IntersectionObserver((entries) => {
        for(const entry of entries) {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        }
    })

    for(const elm of document.getElementsByClassName("observing")) {
        observer.observe(elm);
    }
});