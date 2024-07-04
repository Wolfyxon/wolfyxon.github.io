window.addEventListener("load", () => {
    const soundfontList = document.getElementById("soundfont-list");
    const soundFontListFrag = document.createDocumentFragment();

    function registerSoundfont(name, author, url) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const authorSpan = document.createElement("span");

        a.innerText = name;
        a.href = url;

        authorSpan.innerText = " by " + author;

        li.append(a, authorSpan);
        soundFontListFrag.append(li);
    }

    registerSoundfont("FluidR3 GM", "", "https://member.keymusician.com/Member/FluidR3_GM/");
    registerSoundfont("Organteq 2 Church Organ", "", "https://musical-artifacts.com/artifacts/3579");
    registerSoundfont("General User GS", "", "https://schristiancollins.com/generaluser.php");
    registerSoundfont("Amen Break", "", "https://musical-artifacts.com/artifacts/974");
    

    soundfontList.append(soundFontListFrag);
});