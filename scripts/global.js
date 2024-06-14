window.addEventListener("scroll", () => {
    document.body.style.setProperty("--scroll-y", window.scrollY / (document.body.offsetHeight - window.innerHeight));
    //document.body.style.setProperty("--scroll-x", window.scrollX / (document.body.offsetWidth - window.innerWidth));
});