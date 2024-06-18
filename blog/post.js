window.addEventListener("load", () => {
    const hd = document.createElement("div");
    hd.classList.add("post-header");

    const title = document.createElement("h1");
    title.innerText = document.body.getAttribute("data-post-title");
    title.classList.add("post-title");

    const date = document.createElement("p");
    date.innerText = document.body.getAttribute("data-post-date");
    date.classList.add("post-date");

    hd.append(title, date);
    document.getElementById("main").prepend(hd);
});