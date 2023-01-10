var tablist = {}
var tabs
window.addEventListener("load",function(){
    tablist = {
        "terminal": document.getElementById("terminal"),
        "about": document.getElementById("gi")
    }
    tabs = document.getElementsByClassName("tab")
})

function changeTab(name,button=null) {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none"
        }
        const selected = document.getElementsByClassName("tab-button-selected")
        for (var i = 0; i < selected.length; i++) {
            selected[i].classList.remove("tab-button-selected")
        }
        const elem = tablist[name]
        elem.style.display = "block"
        if(button){
            button.classList.add("tab-button-selected")
        }
}

