window.addEventListener("load", () => {
    const tblColors = document.getElementById("tbl-colors");
    const tblColorsFrag = document.createDocumentFragment();

    function addColorGroup(name, colors) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");

        th.scope = "row";
        th.innerText = name;
        tr.append(th);

        for(const color of colors) {
            const td = document.createElement("td");
            td.innerText = color.toUpperCase();
            td.style.backgroundColor = color;

            tr.append(td);
        }

        tblColorsFrag.append(tr);
    }

    addColorGroup("Red", [
        "#D20000",
        "#900000",
        "#FF0000"
    ]);

    addColorGroup("Purple", [
        "#8300FF",
        "#9700FF",
        "#6600FF"
    ]);

    addColorGroup("Black", [
        "#212121",
        "#292929",
        "#313131"
    ]);

    addColorGroup("Yellow & orange", [
        "#FFA000",
        "#FF5B00",
        "#FFCE00"
    ]);

    tblColors.append(tblColorsFrag);
});