window.addEventListener("load", () => {
    const soundfontList = document.getElementById("soundfont-list");
    const soundFontListFrag = document.createDocumentFragment();

    function registerSoundfont(name, url) {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.innerText = name;
        a.href = url;

        li.append(a);
        soundFontListFrag.append(li);
    }

    registerSoundfont("FluidR3 GM", "https://member.keymusician.com/Member/FluidR3_GM/");

    soundfontList.append(soundFontListFrag);
});