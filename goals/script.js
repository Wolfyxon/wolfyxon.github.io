window.addEventListener("load", () => {
    const goalsInProgress = document.getElementById("goals-in-progress");
    const completeGoals = document.getElementById("complete-goals");
    
    let goalsInProgressHtml = "";
    let completeGoalsHtml = "";
    
    // TODO: Sub-goals, automatic progress calculation, foldable description
    function addGoal(title, progress) {
        const html = `
        <div>
            <div class="goal-header-container">
                <div class="goal-header">
                    <div class="pie-bar" style="--pie-bar-percent: ${progress}%"></div>
                    <h3>${title}</h3>
                </div>
            </div>
        </div>
        `;

        if(progress == 100) {
            completeGoalsHtml += html;
        } else {
            goalsInProgressHtml += html;
        }
    }
    
    addGoal("Learn music", 80);
    addGoal("Learn art", 43);
    addGoal("Learn cybersecurity", 20);
    addGoal("Heal from social anxiety", 40);
    addGoal("Save someone's life", 0);

    addGoal("Learn programming", 100);
    addGoal("Make a game", 100);
    addGoal("Make a nice website", 100);

    goalsInProgress.innerHTML = goalsInProgressHtml;
    completeGoals.innerHTML = completeGoalsHtml; 
});