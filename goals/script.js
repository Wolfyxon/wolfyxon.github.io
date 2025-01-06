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

    addGoal("test", 50);

    goalList.innerHTML = goalsHtml;
});