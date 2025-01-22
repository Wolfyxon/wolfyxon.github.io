window.addEventListener("load", () => {
    const main = document.getElementById("main");

    // -== Static components ==- //

    const hd = document.createElement("div");
    hd.classList.add("post-header");

    const title = document.createElement("h1");
    title.innerText = document.body.getAttribute("data-post-title");
    title.classList.add("post-title");

    const date = document.createElement("p");
    date.innerText = document.body.getAttribute("data-post-date");
    date.classList.add("post-date");

    // -== Nav ==- //
    const nav = document.createElement("div"); 
    nav.id = "post-nav";
    
    const navRoot = document.createElement("ul");
    navRoot.id = "post-nav-root";

    // - nav button switch - //
    const navBtn = document.createElement("button");
    navBtn.id = "post-nav-btn";
    navBtn.ariaLabel = "Navigation";
    let navOpen = false;

    navBtn.addEventListener("click", () => {
        if(navOpen) closeNav();
        else openNav();
    });

    let targetMenuHeight = "0px";
    function openNav() {
        navOpen = true;
        navRoot.style.maxHeight = targetMenuHeight;
        navRoot.style.opacity = "1";
    }

    function closeNav() {
        navOpen = false;
        navRoot.style.maxHeight = "0px";
        navRoot.style.opacity = "0";
    }
   
    // Scanning for headers and adding them to the list

    let currentList = navRoot;
    let currentLevel = 1;

    utils.getDescendants(main).forEach(elm => {
        if(elm.tagName.startsWith("H") && elm.tagName.length === 2) {
            const level = parseInt(elm.tagName.replace("H", ""));

            if(level < currentLevel) {
                for(let i = 0; i < currentLevel - level; i++) {
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
            
            if(level == 1) {
                link.style.fontWeight = "bold";
            }
            
            link.addEventListener("click", () => {
                if(navRoot.style.opacity === "0") return;

                elm.scrollIntoView({
                    "behavior": "smooth"
                });
            });

            currentList.append(link);
        }
    });
    
    // --== Reading time label ==-- //
    const rdtContainer = document.createElement("div");
    rdtContainer.id = "post-rdt";

    const rdtLabel = document.createElement("div");
    rdtLabel.id = "post-rdt-label";
    rdtLabel.innerText = "Reading time";

    const rdtValue = document.createElement("div");
    const time  = document.getElementById("main").innerText.split(" ").length / 200;
    let timeStr = "";

    if(time >= 1) {
        timeStr = `${Math.floor(time)} minutes`;
    } else {
        timeStr = `${Math.floor(60 * time)} seconds`;
    }
    
    rdtValue.id = "post-rdt-value";
    rdtValue.innerText = `~ ${timeStr}`; // TODO: calculate the reading time

    rdtContainer.append(rdtLabel, rdtValue);

    nav.append(navBtn, navRoot, rdtContainer);

    // -== Finish the header ==- //

    hd.append(title, date, nav);
    document.body.append(hd);
    document.body.insertBefore(hd, document.getElementById("main"));

    targetMenuHeight = getComputedStyle(navRoot).height;
    closeNav();
});