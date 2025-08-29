(async () => {
    const data_req = await fetch("/assets/data/people.json");
    let student_data = await data_req.json();
    student_data = student_data.sort((a, b) => a.name.localeCompare(b.name));

    function fillPeopleData(div_id, data) {
        document.getElementById(div_id).replaceChildren(...data.map(d => {
            return fromHTML(`<div class="col-4 col-xs-4 col-sm-4 col-md-4 mb-4">
                <a href="${d.link}" target="_blank" class="card">
                    <div class="card-img-top d-flex justify-content-center align-items-center profile-img-card mb-0">
                        <img src="./assets/images/${d.img}" class="img-fluid profile-img" alt="${d.name}">
                    </div>
                    <div class="card-body">
                        <p class="card-title mb-1">${d.name}</p>
                    </div>
                </a>
            </div>`);
        }));
    }

    fillPeopleData("students", student_data.filter(s => !s.alumnus));
    // fillPeopleData("alumni", student_data.filter(s => s.alumnus));
})()
