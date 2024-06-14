window.addEventListener("load", () => {

    const projectList = document.getElementById("project-list");
    const tmpProjectListFrag = document.createDocumentFragment();

    function registerProject(name, description, thumbnail, links) {
        const div = document.createElement("div");
        
        // Thumbnail
        const img = document.createElement("img")
        img.src = thumbnail;

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
        div.append(text, img);
        tmpProjectListFrag.append(div);
    }



    projectList.append(tmpProjectListFrag);

});