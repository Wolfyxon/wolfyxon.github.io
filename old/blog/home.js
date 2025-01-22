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
    "music",
    "advice",
    "low effort"
];

window.addEventListener("load", () => {
    /* --== Post adding logic ==-- */

    const posts = [];
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

        posts.push({
            "title": title,
            "date": date,
            "description": description,
            "id": id,
            "topics": topics,
            "element": post
        });
    }

    /* -= Posts =- */

    registerPost(
        "Why you should never delete your projects",
        "July 30 2024",
        "Why is it so important to keep them?",
        "30-07-2024_whyYouShouldNeverDeleteYourProjects",
        ["programming", "art", "advice"]
    );

    registerPost(
        "The site was remade",
        "June 18 2024",
        "Some things I have to say about the biggest remake so far.",
        "18-06-2024_siteRemake",
        ["site", "projects"]
    );

    /* -= Final post logic -= */

    postList.append(tmpPostListFrag);

    /* --== Search bar logic ==-- */

    const searchInput = document.getElementById("search-input");
    const topicList = document.getElementById("search-topics-list");
    const enabledTopics = [];

    const topicListFrag = document.createDocumentFragment();
    for(const topic of postTopics) {
        const label = document.createElement("label");

        const check = document.createElement("input");
        check.type = "checkbox";

        check.addEventListener("click", () => {
            if(check.checked) {
                enabledTopics.push(topic);
            } else {
                enabledTopics.splice(enabledTopics.indexOf(topic));
            }

            updatePostList();
        })

        const title = document.createElement("span");
        title.innerText = topic;

        label.append(check, title);
        topicListFrag.append(label);
    }

    topicList.append(topicListFrag);

    function updatePostList() {
        const query = searchInput.value.toLowerCase();

        for(const post of posts) {
            let qualifies = true;

            if(query !== "") {
                if(!post.title.toLowerCase().includes(query) && !post.description.toLowerCase().includes(query)) {
                    qualifies = false;
                }
            }

            if(enabledTopics.length !== 0) {
                qualifies = false;

                for(const topic of post.topics) {
                    if(enabledTopics.includes(topic)) {
                        qualifies = true;
                        break;
                    }
                }
            }

            if(qualifies) {
                post.element.style.removeProperty("display");
            } else {
                post.element.style.display = "none";
            }
            
        }
    }

    searchInput.addEventListener("change", updatePostList);
    searchInput.addEventListener("keydown", updatePostList);
    searchInput.addEventListener("keyup", updatePostList);
    
    
});