window.addEventListener("load", () => {
    const main = document.getElementById("main");

    // -= Static components =-

    const hd = document.createElement("div");
    hd.classList.add("post-header");

    const title = document.createElement("h1");
    title.innerText = document.body.getAttribute("data-post-title");
    title.classList.add("post-title");

    const date = document.createElement("p");
    date.innerText = document.body.getAttribute("data-post-date");
    date.classList.add("post-date");

    // -= Nav =-
    const nav = document.createElement("div"); 
    nav.id = "post-nav";
    
    const navRoot = document.createElement("ul");
    navRoot.id = "post-nav-root";

    const navBtn = document.createElement("button");
    navBtn.id = "post-nav-btn";
    let navOpen = false;

    navBtn.addEventListener("click", () => {
        if(navOpen) closeNav();
        else openNav();
    });

    function openNav() {
        navOpen = true;
        navRoot.style.maxHeight = "300px";
        navRoot.style.opacity = "1";
    }

    function closeNav() {
        navOpen = false;
        navRoot.style.maxHeight = "0px";
        navRoot.style.opacity = "0";
    }

    closeNav();
   
    let currentList = navRoot;
    let currentLevel = 1;

    utils.getDescendants(main).forEach(elm => {
        if(elm.tagName.startsWith("H") && elm.tagName.length === 2) {
            const level = parseInt(elm.tagName.replace("H", ""));

            if(level < currentLevel) {
                for(let i = 0; i < level; i++) {
                    currentList = currentList.parentElement;
                }
            } else if(level > currentLevel) {
                const list = document.createElement("ul");
                currentList.append(list);
                currentList = list;
            }

            currentLevel = level;

            const link = document.createElement("li");
            link.innerText = elm.innerText;
            link.style.fontSize = 100 - (currentLevel * 12) + "%";
            
            link.addEventListener("click", () => {
                if(navRoot.style.opacity === "0") return;

                elm.scrollIntoView({
                    "behavior": "smooth"
                });
            });

            currentList.append(link);
        }
    });
    
    
    nav.append(navBtn, navRoot);

    // -= Finish the header =-

    hd.append(title, date, nav);
    document.body.append(hd);
    document.body.insertBefore(hd, document.getElementById("main"));
});