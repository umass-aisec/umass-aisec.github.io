document.getElementById('year').textContent = new Date().getFullYear();

const roster = [
    {
        "date": "Mon, Sep 08",
        "date2": "2025/09/08",
        "name": "Ilia Shumailov",
        "affiliation": "Google Deepmind",
        "link": "https://scholar.google.com/citations?user=e-YbZyEAAAAJ",
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Sep 15",
        "date2": "2025/09/15",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Sep 22",
        "date2": "2025/09/22",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Sep 29",
        "date2": "2025/09/29",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Oct 06",
        "date2": "2025/10/06",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Oct 20",
        "date2": "2025/10/20",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Oct 27",
        "date2": "2025/10/27",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Nov 03",
        "date2": "2025/11/03",
        "name": "Kathrin Grosse",
        "affiliation": "IBM Research",
        "link": "https://scholar.google.com/citations?user=LrYcIxYAAAAJ",
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Nov 10",
        "date2": "2025/11/10",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Nov 17",
        "date2": "2025/11/17",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Nov 24",
        "date2": "2025/11/24",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Dec 01",
        "date2": "2025/12/01",
        "name": null,
        "affiliation": null,
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, Dec 08",
        "date2": "2025/12/08",
        "name": "Umass Research Talk",
        "affiliation": "Umass Amherst",
        "link": null,
        "title": null,
        "abstract": null,
        "bio": null,
    },
]

function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;

    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}

const nodes = [];
for (let i = 0; i < roster.length; ++i) {
    const speaker = roster[i];
    const week_num = (i < 9 ? "0" : "") + (i + 1);
    const speaker_info = speaker.name != null
        ? `<a target="_blank" href="${speaker.link ?? '#'}">${speaker.name ?? 'Speaker TBD'}</a> (${speaker.affiliation ?? 'TBD'}): ${speaker.title ?? 'Topic TBD'}`
        : "TBD";
    const li = fromHTML(`
        <li class="list-group-item d-flex flex-column flex-md-row align-items-md-center">
            <span class="badge bg-primary me-md-2 mx-auto mb-2 mb-md-0 mx-md-0">Week ${week_num}: ${speaker.date}</span>
            <span class="topic">
                ${speaker_info}
                <a class="collapsed ${speaker.abstract == null ? 'd-none' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">(abstract)</a>
            </span>
        </li>
    `); 
    
    nodes.push(li);
    if (speaker.abstract != null) {
        const abstract = fromHTML(`
            <div id="collapse${i}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <p class="text-start">${speaker.abstract}</p>
                    <p class="text-start ${speaker.bio == null ? 'd-none' : ''}"><span class="fw-bold">Bio</span>: ${speaker.bio}</p>
                </div>
            </div>
        `);
        nodes.push(abstract);
    }
}

document.getElementById("calendar").replaceChildren(...nodes);

const previous_seminars = ["S25"];
const archived = [];
for (let seminar of previous_seminars) {
    const link = fromHTML(`
        <a target="_blank" href="./${seminar}/index.html" class="pe-3">${seminar[0] == "S" ? "Spring" : "Fall"} 20${seminar.slice(1)}</a>`
    );
    archived.push(link);
}
document.getElementById("archive-list").replaceChildren(...archived);