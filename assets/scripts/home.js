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
        "assets/media/img/home/projectThumbnails/tgdod.webp", 
        [{
            text: "Play on Roblox", 
            url: "https://www.roblox.com/games/10748929809/The-Great-Doors-of-Door-AAAA"
        }]
    );

    registerProject(
        "Turret Siege",
        "A game in early development where you are a turret surrounded by bullets and enemies.",
        "assets/media/img/home/projectThumbnails/ts.png",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/TurretSiege/"
            },
            {
                text: "Downloads",
                url: "https://github.com/Wolfyxon/TurretSiege/releases/latest"
            }
        ]
    );

    registerProject(
        "3DS Web stuff",
        "A collection of browser games and tools made for the Nintendo 3DS browser.",
        "assets/media/img/home/projectThumbnails/3dsWebStuff.png",
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
        "Lover",
        "Command line build system for LÖVE2D.",
        "assets/media/img/home/projectThumbnails/lover.png",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/lover"
            },
            {
                text: "Wiki",
                url: "https://github.com/Wolfyxon/lover/wiki"
            },
            {
                text: "Downloads",
                url: "https://github.com/Wolfyxon/lover/releases/latest"
            }
        ]
    );

    registerProject(
        "MinVideo",
        "Easy to understand and implement uncompressed video format for limited environments.",
        "assets/media/img/home/projectThumbnails/MinVideo.png",
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
        "Hero of the Earth",
        "Discontinued post apocalyptic story game.",
        "assets/media/img/home/projectThumbnails/hote.png",
        [
            {
                text: "Itch.io page",
                url: "https://wolfyxon.itch.io/hote"
            },
            {
                text: "Downloads",
                url: "https://wolfyxon.itch.io/hote#download"
            }
        ]
    )

    registerProject(
        "This site",
        "I think it deserves to be listed here since I put quite a lot of effort into it :]",
        "assets/media/img/Wolfyxon.png",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/wolfyxon.github.io"
            },
            {
                text: "Useless button",
                url: ""
            }
        ]
    );

    projectList.append(tmpProjectListFrag);

    const programmersList = document.getElementById("programmers-list");
    const tmpProgrammersListFrag = document.createDocumentFragment();
    
    function registerProgrammer(name, thumbnail, links, description, website) {
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

        let websiteLink;

        if(website) {
            websiteLink = document.createElement("a");
            websiteLink.href = website;
            websiteLink.innerText = website;
            websiteLink.className = "programmers-website";
        }

        textSection.append(nameEle, descEele);
        
        if(websiteLink) {
            textSection.append(websiteLink);
        }

        textSection.append(linksEle);

        div.append(img, textSection);
        div.classList.add("observing");
        tmpProgrammersListFrag.append(div);
    }

    registerProgrammer(
        "Karoleus.PL", 
        "/assets/media/img/people/karoleus_pl.png", 
        [
            "https://x.com/karoleuspl",
            "https://www.youtube.com/@KaroleusPL",
            "https://soundcloud.com/karoleus-pl",
            "https://github.com/KaroleusPL"
        ], 
        "Game developer, experienced artist and musician. Also my best friend.",
        "https://karoleuspl.github.io"
    );

    programmersList.append(tmpProgrammersListFrag);
});