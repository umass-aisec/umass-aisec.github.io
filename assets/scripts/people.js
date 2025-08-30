async function loadPeopleData() {
    // Wait a bit to ensure fromHTML is available
    if (typeof fromHTML === 'undefined') {
        setTimeout(loadPeopleData, 100);
        return;
    }

    try {
        const data_req = await fetch("../assets/data/people.json");
        let student_data = await data_req.json();
        student_data = student_data.sort((a, b) => a.name.localeCompare(b.name));

        function fillPeopleData(div_id, data) {
            const container = document.getElementById(div_id);
            if (!container) return;
            
            container.replaceChildren(...data.map(d => {
                return fromHTML(`<div class="col-12 col-sm-6 col-md-4 mb-4">
                    <a href="${d.link}" target="_blank" class="card profile-card">
                        <div class="card-img-top d-flex justify-content-center align-items-center profile-img-card mb-0">
                            <img src="../assets/images/${d.img}" class="img-fluid profile-img" alt="${d.name}">
                        </div>
                        <div class="card-body">
                            <p class="card-title mb-1">${d.name}</p>
                        </div>
                    </a>
                </div>`);
            }));
        }

        fillPeopleData("students", student_data.filter(s => !s.alumnus));
        fillPeopleData("alumni", student_data.filter(s => s.alumnus));
    } catch (error) {
        console.error("Error loading people data:", error);
    }
}

// Start loading when script executes
loadPeopleData();