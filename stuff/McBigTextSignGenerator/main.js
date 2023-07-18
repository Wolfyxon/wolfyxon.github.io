const defaultChar = "█";
var chars = {
    "A":"██\n" + //It looks like R with a non-minecraft font
        "█  █\n" +
        "███\n" +
        "█  █",

    "B":"████   \n" +
        "█████ \n" +
        "█     █ \n" +
        "█████ ",

    "C":"  ███ \n" +
        "█     \n" +
        "█     \n" +
        "  ███ ",

    "D":"████   \n" +
        "█     █\n" +
        "█     █\n" +
        "████   ",

    "E":"████\n" +
        "██   \n" +
        "█    \n" +
        "████",

    "F":"████\n" +
        "█    \n" +
        "███ \n" +
        "█    ",

    "G":"  ███ \n" +
        "█     \n" +
        "  █    █ \n" +
        "  ███ ",

    "H":"█   █\n" +
        "████\n" +
        "█   █\n" +
        "█   █",

    "I":"███\n" +
        " █ \n" +
        " █ \n" +
        "███\n",

    "J":"    █\n" +
        "    █\n" +
        "█   █\n" +
        " ███\n",

    "K":"█   █\n" +
        "███  \n" +
        "█   █\n" +
        "█   █",

    "L":"█   \n" +
        "█   \n" +
        "█   \n" +
        "███\n",

    "M":"█    █\n"  +
        "█ █ █ █\n" +
        "█  █  █\n" +
        "█      █",

    "N":"█    █\n" +
        "██  █\n" +
        "█  ██\n" +
        "█    █\n",

    "O":" ██ \n" +
        "█  █\n" +
        "█  █\n" +
        " ██ \n",

    "P":"██ \n" +
        "█  █\n" +
        "██  \n" +
        "█   ",

    "Q":" ██ \n" +
        "█  █\n" +
        " ██ \n" +
        "     █",

    "R":"██  \n" +
        "█  █ \n" +
        "██   \n" +
        "█  █ ",

    "S":"  ██\n" +
        "█  \n" +
        "   █ \n" +
        " ██  \n",

    "T":"████\n" +
        "█\n" +
        "█\n" +
        "█",

    "U":"█  █\n" +
        "█  █\n" +
        "█  █\n" +
        " ██ \n",

    "V":"█ █\n" +
        "█ █\n" +
        "█ █\n" +
        " █ \n",

    "W":"█ █ █\n" +
        "█ █ █\n" +
        "█ █ █\n" +
        " █ █ \n",

    "X":"█ █\n" +
        " █ \n" +
        " █ \n" +
        "█ █",

    "Y":"█ █\n" +
        "█ █\n" +
        " █ \n" +
        " █ ",
    "Z":"███\n" +
        "  █\n" +
        "█  \n" +
        "███\n"
}
const signChars = 15;
const signRows = 4;
var spacing = 2

function strTimes(str,amount){
    var ret = "";
    for(var i=0;i<amount;i++){
        ret += str;
    }
    return ret;
}
function n2br(str){ return str.replace("\n","<br>"); }
function br2n(str){ return str.replace("<br>","\n") }
function inline(str){ return str.replace("\n","").replace("<br>",""); }

function lineSplit(str){ return str.split("\n"); }

window.addEventListener("load", async(event) => {
    const inputElem = document.getElementById("text-input")
    const signsElem = document.getElementById("signs");
    const mainSign = document.getElementsByClassName("sign")[0]
    const emptySignText = mainSign.innerHTML;

    function getSigns(){
        const allSigns = document.getElementsByClassName("sign");
        var ret = []
        for(var i=0;i<allSigns.length;i++){
            const sign = allSigns[i];
            if(sign !== mainSign) ret.push(sign)
        }
        return ret
    }

    async function removeSigns(){
        const signs = getSigns();
        for(var i=0;i<signs.length;i++){
            signs[i].remove();
        }
    }
    async function clear(){
        removeSigns()
        const brs = signsElem.getElementsByTagName("br")
        for(var i=0;i<brs.length;i++){
            brs[i].remove();
        }
    }

    function addAndGetSign(){
        const sign = mainSign.cloneNode();
        sign.style.display = "inline-block"
        signsElem.appendChild(sign);
        return sign;
    }

    async function setText(input){
        await clear();
        if(input.length == 0) return;

        input = inline(input);
        const split = input.split("");
        //mainSign.innerHTML = n2br(chars[ split[0] ])
        mainSign.style.display = "none"
        for(var i=0;i<split.length;i++){
            var char = chars[split[i]];
            if(split[i] == " ") signsElem.appendChild(document.createElement("br"));
            else {
                if(char === undefined) {
                    const sign = addAndGetSign();
                    sign.style.color = "darkred";
                    sign.innerHTML = "⚠<br>Missing<br>character"
                }
                else addAndGetSign().innerHTML = n2br(char)
            }

        }
    }

    function reset(){
        const initText = "HELLO WORLD"
        removeSigns();
        inputElem.value = initText;
        setText(initText)
    }
    //reset();

    inputElem.addEventListener("input", () => {
        setText(inputElem.value.toUpperCase());
    })

    document.getElementById("btn-load-custom-font").onclick = function (){
        const pErr = document.getElementById("custom-font-error")
        function err(message){
            pErr.style.opacity = 1
            pErr.innerHTML = "Error: "+message
        }
        const area = document.getElementById("custom-font")
        const dataTxt = area.value;
        if(dataTxt === ""){
            err("No data")
            return
        }

        try {
            chars = JSON.parse(dataTxt)
            pErr.style.opacity = 0
        } catch (e) {
            err("Invalid JSON code.")
        }
    }


    const main = document.getElementById("main")
    const menuBar = document.getElementById("menu-bar")
    const menuContainer = document.getElementById("menu")
    const menuMain = document.getElementById("menu-main")

    const initMenuMainWith = menuMain.style.width
    const initMenuContainerWith = menuContainer.style.width
    const initMainWith = main.style.width

    var menuOpen = true
    function openMenu(){
        menuOpen = true
        menuMain.style.display = "inline-block"
        menuMain.style.maxWidth = "100%"
        menuMain.style.opacity = "1"
        main.style.width = initMainWith
        menuMain.style.opacity = "1"
        menuBar.style.width = initMenuMainWith
        menuContainer.style.width = initMenuContainerWith
    }
    function closeMenu(){
        menuOpen = false
        menuMain.style.display = "none"
        menuMain.style.maxWidth = "0"
        //menuMain.style.opacity = "0"
        menuBar.style.width = "100%"
        menuContainer.style.width = "2%";
        main.style.width = "97%"
    }
    function syncMenuOpenState(){
        if(menuOpen) openMenu()
        else closeMenu()
    }
    syncMenuOpenState()
    menuBar.onclick = function (){
        menuOpen = !menuOpen
        syncMenuOpenState()
    }


});
