(async () => {
    const speaker_req = await fetch("/assets/data/seminar.json");
    const speaker_data = await speaker_req.json();
    const current_semester = Object.keys(speaker_data)[0];
    const roster = speaker_data[current_semester]

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming_events = roster
        .filter(speaker => (new Date(speaker.date2)) >= today)
        .sort((a, b) => (new Date(a.date2)) - (new Date(b.date2)));
    let closest_event = null;
    if (upcoming_events.length > 0) {
        closest_event = upcoming_events[0];
    } else {
        closest_event = roster.sort((a, b) => (new Date(a.date2)) - (new Date(b.date2)))[0];
    }

    if (closest_event == null) {
        return;
    }

    const semester_label = `${(current_semester[0] == "F" ? "Fall" : "Spring")} '${current_semester.slice(1)}`;

    event_div = fromHTML(`
        <div>
            <h4 style="margin-bottom: 1rem; font-weight: 600;">🎓 Upcoming Seminar</h4>
            <h5 style="margin-bottom: 0.8rem; font-weight: 600;">Join our ${semester_label} AI Safety, Privacy and Security seminar!</h5>
            <p style="margin-bottom: 0.5rem; opacity: 0.9;">Next Speaker: <strong>${closest_event.name}</strong>, ${closest_event.affiliation}</p>
            <p style="margin-bottom: 0; opacity: 0.8; font-size: 0.95rem;">📅 ${closest_event.date} | ⏰ 10:00 AM - 11:00 AM ET | 📍 CS 142 or via <a href="https://umass-amherst.zoom.us/j/99205813493?pwd=bJXhS6wqB4Oqido91tsq8jjVQR6QM8.1" style="color: var(--umass-gold);">Zoom</a></p>
        </div>
    `);
    document.getElementById("seminar_event").replaceChildren(event_div);
})()