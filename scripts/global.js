const global = {
    
    observer: new IntersectionObserver((entries, obs) => {
        for(const entry of entries) {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        }
    })
};

window.addEventListener("load", () => {

    for(const observing of document.getElementsByClassName("observing")) {
        global.observer.observe(observing);
    }
});