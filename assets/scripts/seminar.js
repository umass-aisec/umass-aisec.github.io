(async () => {
    const speaker_req = await fetch("/assets/data/seminar.json");
    const speaker_data = await speaker_req.json();
    const current_semester = Object.keys(speaker_data)[0];

    function renderRoster(semester) {
        const roster = speaker_data[semester] || [];
        const nodes = [];

        for (let i = 0; i < roster.length; ++i) {
            const speaker = roster[i];
            const week_num = (i < 9 ? "0" : "") + (i + 1);
            const speaker_info = speaker.name != null
                ? `<a target="_blank" href="${speaker.link ?? '#'}">${speaker.name ?? 'Speaker TBD'}</a> (${speaker.affiliation ?? 'TBD'}): ${speaker.title ?? 'Topic TBD'}`
                : "TBD";

            const li = fromHTML(`
        <li class="list-group-item d-flex flex-column flex-md-row align-items-center align-items-md-center">
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
    }

    renderRoster(current_semester);

    const calendar_options = [];
    for (let sem of Object.keys(speaker_data)) {
        const selected = sem == current_semester ? "selected" : "";
        const sem_name = `${sem[0] == "S" ? "Spring" : "Fall"} ${sem.slice(1)}`;
        const option = fromHTML(`<option value="${sem}" ${selected}>${sem_name}</option>`);
        calendar_options.push(option);
    }

    const calendar_control = document.getElementById("calendar_control");
    calendar_control.replaceChildren(...calendar_options);
    calendar_control.onchange = ((ev) => {
        renderRoster(ev.target.value);
    });
})()