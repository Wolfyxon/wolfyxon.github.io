const postTopics = [
    "site",
    "projects",
    "programming",
    "software",
    "tech",
    "life",
    "psychology",
    "concept",
    "analysis",
    "funny",
    "art",
    "music"
];



window.addEventListener("load", () => {
    const postList = document.getElementById("posts");
    const tmpPostListFrag = document.createDocumentFragment();

    function registerPost(title, date, description, id, topics) {
        const post = document.createElement("a");
        post.href = id;

        const titleEle = document.createElement("h1");
        titleEle.innerText = title;
        
        const dateEle = document.createElement("span");
        dateEle.classList.add("post-date");
        dateEle.innerText = date;

        titleEle.append(dateEle);
        post.append(titleEle);

        const textSection = document.createElement("div");
        textSection.classList.add("post-text");

        const descriptionEle = document.createElement("p");
        descriptionEle.innerText = description;
        
        const topicsEle = document.createElement("div");
        topicsEle.classList.add("post-topics");

        for(const topic of topics) {
            if(!postTopics.includes(topic)) console.warn(`Unregistered topic ${topic}`);

            const ele = document.createElement("div");
            ele.innerText = topic;

            topicsEle.append(ele);
        }

        textSection.append(descriptionEle, topicsEle);
        post.append(textSection);

        tmpPostListFrag.append(post);
    }

    registerPost(
        "Why you should never delete your projects",
        "July 30 2024",
        "Why is it so important to keep them?",
        "30-07-2024_whyYouShouldNeverDeleteYourProjects",
        ["programming", "art"]
    );

    registerPost(
        "The site was remade",
        "June 18 2024",
        "Some things I have to say about the biggest remake so far.",
        "18-06-2024_siteRemake",
        ["site"]
    );

    postList.append(tmpPostListFrag);
});