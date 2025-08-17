// IMPORTANT: Whenever you update the student data,
// make sure to also update the `publications/prepare_pubs.py` file
// since it's pulling papers based on student names.
const student_data = [
    {
        "name": "Dzung Pham",
        "link": "https://dzungvpham.github.io/",
        "img": "dzung.jpg",
        "alumnus": false,
    },
    {
        "name": "Ali Naseh",
        "link": "https://ali7naseh.github.io/",
        "img": "ali.jfif",
        "alumnus": false,
    },
    {
        "name": "Yuefeng Peng",
        "link": "https://bujuef.github.io/",
        "img": "yuefeng.png",
        "alumnus": false,
    },
    {
        "name": "Jaechul Roh",
        "link": "https://jrohsc.github.io/",
        "img": "roh.jpg",
        "alumnus": false,
    },
    {
        "name": "Hyejun Jeong",
        "link": "https://www.linkedin.com/in/june-jeong-311a311a1/",
        "img": "june.jpg",
        "alumnus": false,
    },
    {
        "name": "Mohammadreza Teymoorianfard",
        "link": "https://www.linkedin.com/in/mohammadreza-teymoorian-fard/",
        "img": "mohammadreza.jpg",
        "alumnus": false,
    },
    {
        "name": "Arisa Tajima",
        "link": "https://arisa77.github.io/",
        "img": "arisa.jpg",
        "alumnus": false,
    },
    {
        "name": "Abhinav Kumar",
        "link": "https://www.securegradients.com/",
        "img": "abhinav.jpg",
        "alumnus": false,
    },
    {
        "name": "Virat Shejwalkar",
        "link": "https://people.cs.umass.edu/~vshejwalkar/",
        "img": "virat.jpg",
        "alumnus": true,
    },
    {
        "name": "Hamid Mozaffari",
        "link": "https://hamidmozaffari.github.io/",
        "img": "hamid.jpg",
        "alumnus": true,
    },
    {
        "name": "Milad Nasr",
        "link": "https://www.linkedin.com/in/milad-nasr-50ab6a56/",
        "img": "milad.jfif",
        "alumnus": true,
    },
].sort((a, b) => a.name.localeCompare(b.name));

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
fillPeopleData("alumni", student_data.filter(s => s.alumnus));
