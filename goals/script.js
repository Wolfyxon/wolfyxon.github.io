window.addEventListener("load", () => {
    const goalList = document.getElementById("goals");
    
    let goalsHtml = "";

    function addGoal(title, progress) {
        goalsHtml += `
        <div>
            <div class="goal-header-container">
                <div class="goal-header">
                    <div class="pie-bar" style="--pie-bar-percent: ${progress}%"></div>
                    <h1>${title}</h1>
                </div>
            </div>
        </div>
        `;
    }

    addGoal("Learn music", 80);
    addGoal("Learn art", 43);
    addGoal("Heal from social anxiety", 40);
    addGoal("Save someone's life", 0);

    goalList.innerHTML = goalsHtml;
});