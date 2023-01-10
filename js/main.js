window.addEventListener("load",function (){
    const noscripts = document.getElementsByClassName("noscript")
    for(var i=0;i<noscripts.length;i++){
        //<noscript> tag doesn't always work
        const elem = noscripts[i]
        elem.style.display = "none"
    }
})