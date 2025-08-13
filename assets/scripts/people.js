const student_data = [
    {
        "name": "Dzung Pham",
        "link": "https://dzungvpham.github.io/",
        "img": "dzung.jpg",
    },
    {
        "name": "Ali Naseh",
        "link": "https://ali7naseh.github.io/",
        "img": "ali.jfif",
    },
    {
        "name": "Yuefeng Peng",
        "link": "https://bujuef.github.io/",
        "img": "yuefeng.png",
    },
    {
        "name": "Jaechul Roh",
        "link": "https://jrohsc.github.io/",
        "img": "roh.jpg",
    },
    {
        "name": "Hyejun Jeong",
        "link": "https://www.linkedin.com/in/june-jeong-311a311a1/",
        "img": "june.jpg",
    },
    {
        "name": "Mohammadreza Teymoorianfard",
        "link": "https://www.linkedin.com/in/mohammadreza-teymoorian-fard/",
        "img": "mohammadreza.jpg",
    },
    {
        "name": "Arisa Tajima",
        "link": "https://arisa77.github.io/",
        "img": "arisa.jpg",
    },
    {
        "name": "Abhinav Kumar",
        "link": "https://www.securegradients.com/",
        "img": "abhinav.jpg",
    },
].sort((a, b) => a.name.localeCompare(b.name));

document.getElementById("students").replaceChildren(...student_data.map(student => {
    return fromHTML(`<div class="col-4 col-xs-4 col-sm-4 col-md-4 mb-4">
        <a href="${student.link}" target="_blank" class="card">
            <div class="card-img-top d-flex justify-content-center align-items-center profile-img-card mb-0">
                <img src="./assets/images/${student.img}" class="img-fluid profile-img" alt="${student_data.name}">
            </div>
            <div class="card-body">
                <p class="card-title mb-1">${student.name}</p>
            </div>
        </a>
    </div>`);
}));
