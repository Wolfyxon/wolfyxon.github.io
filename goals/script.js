window.addEventListener("load", () => {
    const goalList = document.querySelector(".goals");
    
    let goalsHtml = "";

    // TODO: Sub-goals, automatic progress calculation, foldable description
    function addGoal(title, progress) {
        goalsHtml += `
        <div>
            <div class="goal-header-container">
                <div class="goal-header">
                    <div class="pie-bar" style="--pie-bar-percent: ${progress}%"></div>
                    <h3>${title}</h3>
                </div>
            </div>
        </div>
        `;
    }
    
    addGoal("Learn music", 80);
    addGoal("Learn art", 43);
    addGoal("Learn cybersecurity", 20);
    addGoal("Heal from social anxiety", 40);
    addGoal("Save someone's life", 0);

    addGoal("Learn programming", 100);
    addGoal("Make a game", 100);
    addGoal("Make a nice website", 100);

    goalList.innerHTML = goalsHtml;
});