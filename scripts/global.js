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
    const header = document.getElementsByTagName("header")[0];
    const footer = document.getElementsByTagName("footer")[0];

    document.body.prepend(header);
    document.body.append(footer);

    // Request header and footer
    const headerHtml = await utils.httpGet("/components/header.html");
    header.innerHTML = headerHtml.replace("<header>", "").replace("</header>", "");

    const footerHtml = await utils.httpGet("/components/footer.html");
    footer.innerHTML = footerHtml.replace("<footer>", "").replace("</footer>", "");

    // Set page title (if present)
    const title = document.body.getAttribute("data-title");
    const mainPage = document.body.getAttribute("data-main-page") || "";
    
    if(title) {
        const headerPageTitle = document.getElementById("header-page-title");
        headerPageTitle.style.display = "";
        headerPageTitle.href = mainPage;

        headerPageTitle.children[0].innerText = title;
    }

    // --== Observe all elements with the 'observing' class ==--
    for(const observing of document.getElementsByClassName("observing")) {
        global.observer.observe(observing);
    }

    // --== Dropdown button class ==--

    for(const btn of document.getElementsByClassName("dropdown-btn")) {
        const targetId = btn.getAttribute("data-target");
        if(!targetId) {
            console.warn("No data-target specified for dropdown, ignoring.", btn);
            continue;
        }

        const target = document.getElementById(targetId);
        if(!target) {
            console.warn(`Element #${targetId} not found, ignoring.`, btn);
            continue;
        }

        let visible = false;

        function show() {
            visible = true;
            target.style.removeProperty("display");
        }

        function hide() {
            visible = false;
            target.style.display = "none";
        }

        btn.addEventListener("click", () => {
            if(visible) hide();
            else show()
        });

        document.addEventListener("click", (e) => {
            if(e.target === btn) return;
            if(!utils.getAncestors(e.target).includes(target)) hide();
        });

        hide();
    }

    // --== Tab container class ==--

    for(const container of document.getElementsByClassName("tab-container")) {
        const tabs = [];

        const buttons = document.createElement("div")
        buttons.className = "tab-buttons";

        for(const tab of container.children) {
            const name = tab.getAttribute("data-tab-name");
            if(!name) continue;

            const btn = document.createElement("button");
            btn.innerText = name;

            btn.addEventListener("click", () => {
                showTab(tab);
            });

            tabs.push(tab);
            buttons.append(btn);
        }

        container.prepend(buttons)

        function showTab(tab) {
            for(const t of tabs) {
                t.style.display = "none";
                t.classList.remove("selected")
            }

            tab.classList.add("selected");
            tab.style.removeProperty("display");
        }

        showTab(tabs[0]);
    }
});