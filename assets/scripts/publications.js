(async () => {
    const pubs = await fetch("/assets/data/pubs.json");
    const pubs_json = await pubs.json();

    const current_year = new Date().getFullYear();

    function renderPublications() {
        const hide_preprint = document.getElementById("hide_preprint").checked;
        const pubs_html = [];
        const pubs = hide_preprint
            ? pubs_json.filter(p => p.venue != "arXiv")
            : pubs_json;
        const min_year = 2017;

        for (let year = current_year; year >= min_year; --year) {
            const filtered_pubs = pubs.filter(p => p.year == year);
            if (filtered_pubs.length == 0) {
                break;
            }
            pubs_html.push(fromHTML(`<h5>${year}</h5>`));
            pubs_html.push(...filtered_pubs.map(p => fromHTML(
                `<div class="mb-3">
                    <a target="_blank" href="${p.url}">${p.title}</a>
                    <span>${p.coAuthorName}.</span>
                    <span class="bg-primary badge">${p.venue}</span>
                </div>`
            )));
        }
        document.getElementById("publications").replaceChildren(...pubs_html);
    }

    renderPublications();
    document.getElementById("hide_preprint").onchange = renderPublications;
})();