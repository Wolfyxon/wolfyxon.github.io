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

            tab.button = btn;
            tabs.push(tab);
            buttons.append(btn);
        }

        container.prepend(buttons)

        function showTab(tab) {
            for(const t of tabs) {
                t.style.display = "none";
                t.button.classList.remove("selected")
            }

            tab.button.classList.add("selected");
            tab.style.removeProperty("display");
        }

        showTab(tabs[0]);
    }
});