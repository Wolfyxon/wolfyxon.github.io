window.addEventListener("scroll", () => {

    const observer = new IntersectionObserver((entries, obs) => {
        for(const entry of entries) {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        }
    });

    for(const observing of document.getElementsByClassName("observing")) {
        observer.observe(observing);
    }
});