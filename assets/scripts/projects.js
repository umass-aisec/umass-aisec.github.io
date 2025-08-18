(async () => {
    const pubs = await fetch("/assets/data/pubs.json");
    const pubs_json = await pubs.json();

    const current_year = new Date().getFullYear();
    const pubs_html = [];

    // pubs_html.push(fromHTML("<h5>Preprints</h5>"));
    // pubs_html.push(...pubs_json.filter(p => p.year >= current_year - 2 && p.venue == "arXiv").map (p => fromHTML(
    //     `<div class="mb-3">
    //         <a target="_blank" href="${p.pub}">${p.title}</a>
    //         <span><strong>${p.venue} ${p.year}</strong>.</span>
    //         <span>${p.coAuthorName}.</span>
    //     </div>`
    // )));

    for (let year = current_year; year >= current_year - 4; --year) {
        pubs_html.push(fromHTML(`<h5>${year}</h5>`));
        pubs_html.push(...pubs_json.filter(p => p.year == year && p.venue != "arXiv").map(p => fromHTML(
            `<div class="mb-3">
                <a target="_blank" href="${p.pub}">${p.title}</a>
                <span><strong>${p.venue}</strong>.</span>
                <span>${p.coAuthorName}.</span>
            </div>`
        )));
    }
    document.getElementById("publications").replaceChildren(...pubs_html);
})();