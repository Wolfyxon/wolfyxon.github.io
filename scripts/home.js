window.addEventListener("load", () => {

    const projectList = document.getElementById("project-list");
    const tmpProjectListFrag = document.createDocumentFragment();

    function registerProject(name, description, thumbnail, links) {
        const div = document.createElement("div");
        
        // Thumbnail
        const img = document.createElement("img")
        img.src = thumbnail;
        img.alt = "No thumbnail available";

        // .project-text
        const text = document.createElement("div");
        text.className = "project-text";

        const nameEle = document.createElement("h2");
        const descEle = document.createElement("p");

        nameEle.innerText = name;
        descEle.innerText = description;
        
        text.append(nameEle, descEle)

        // Links
        if(links) {
            for(const linkObj of links) {
                const a = document.createElement("a");
                a.innerText = linkObj.text;
                a.href = linkObj.url;

                text.append(a);
            }
        }

        // Finish
        div.classList = "observing anim-obs-fade";
        global.observer.observe(div);
        div.append(text, img);
        tmpProjectListFrag.append(div);
    }

    registerProject(
        "The Great Doors of Door", 
        "A game that was supposed to be a parody of DOORS, but we accidentally made a lore and it became something entirely different. Made by me, Karoleus.PL and rob eeee.", 
        "media/img/home/projectThumbnails/tgdod.webp", 
        [{
            text: "Play on Roblox", 
            url: "https://www.roblox.com/games/10748929809/The-Great-Doors-of-Door-AAAA"
        }]
    );

    registerProject(
        "Turret Siege",
        "A game in early development where you are a turret surrounded by bullets and enemies.",
        "media/img/home/projectThumbnails/ts.png",
        [{
            text: "Source code",
            url: "https://github.com/Wolfyxon/TurretSiege/"
        }]
    );

    registerProject(
        "3DS Web stuff",
        "A collection of browser games and tools made for the Nintendo 3DS browser.",
        "https://github-readme-stats.vercel.app/api/pin/?username=wolfyxon&repo=3ds-web-stuff",
        [
            {
                text: "Visit the site",
                url: "https://wolfyxon.github.io/3ds-web-stuff"
            },
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/3ds-web-stuff"
            }
        ]
    );

    registerProject(
        "MinVideo",
        "Easy to understand and implement uncompressed video format for limited environments.",
        "https://github-readme-stats.vercel.app/api/pin/?username=wolfyxon&repo=minvideo",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/MinVideo"
            },
            {
                text: "Web player",
                url: "https://wolfyxon.github.io/MinVideo/js/test"
            }
        ]
    );

    registerProject(
        "This site",
        "I think it deserves to be listed here since I put quite a lot of effort into it :]",
        "media/img/Wolfyxon.png",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/wolfyxon.github.io"
            }
        ]
    );

    projectList.append(tmpProjectListFrag);

    const programmersList = document.getElementById("programmers-list");
    const tmpProgrammersListFrag = document.createDocumentFragment();
    
    function registerProgrammer(name, thumbnail, links, description) {
        const div = document.createElement("div");

        const img = document.createElement("img");
        img.src = thumbnail;
        img.alt = "Thumbnail";

        const textSection = document.createElement("div");

        const nameEle = document.createElement("h1");
        nameEle.innerText = name;

        const descEele = document.createElement("p");
        descEele.innerText = description || "";

        const linksEle = document.createElement("div");
        linksEle.classList.add("programmer-links");

        for(const link of links) {
            const a = document.createElement("a");
            a.href = link;

            const img = document.createElement("img");
            img.src = utils.getSocialIcon(link);
            img.alt = utils.getSocialName(link);

            a.append(img);
            linksEle.append(a);
        }

        textSection.append(nameEle, descEele, linksEle);

        div.append(img, textSection);
        div.classList.add("observing");
        tmpProgrammersListFrag.append(div);
    }

    registerProgrammer(
        "Karoleus.PL", 
        "/media/img/people/karoleus_pl.png", 
        [
            "https://x.com/karoleuspl",
            "https://www.youtube.com/@KaroleusPL",
            "https://soundcloud.com/karoleus-pl",
            "https://github.com/KaroleusPL"
        ], 
        "Starting game developer, experienced artist and musician. Also my best friend."
    );

    programmersList.append(tmpProgrammersListFrag);
});