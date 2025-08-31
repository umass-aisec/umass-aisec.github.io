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

document.getElementById("header").replaceChildren(
    fromHTML(`
        <header class="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 mb-4 border-bottom">
            <a href="/"
                class="d-flex align-items-center mb-2 mb-md-0 link-body-emphasis text-decoration-none">
                <img id="logo" class="me-2" src="/assets/images/UMass AISec Logo.svg">
                <span class="fs-4 text-center text-md-start">AI Security Lab at <span class="umass">UMass</span></span>
            </a>

            <ul class="nav justify-content-center mt-0 mt-md-0 mb-0">
                <li class="nav-item">
                    <a href="/" class="nav-link px-2">Home</a>
                </li>
                <li class="nav-item">
                    <a href="/people" class="nav-link px-2">People</a>
                </li>
                <li class="nav-item">
                    <a href="/seminar" class="nav-link px-2">Seminar</a>
                </li>
                <li class="nav-item">
                    <a href="/publications" class="nav-link px-2">Publications</a>
                </li>
                <li class="nav-item">
                    <a href="/demo" class="nav-link px-2">Demo</a>
                </li>
            </ul>
        </header>
    `)
);

function normalizeLinkPath(path) {
    let last_idx = 1;
    while (last_idx < path.length && path[last_idx] != "/") {
        last_idx++;
    }
    return path.slice(0, last_idx);
}

// Automatically add .active to the right nav menu item
const currentPath = normalizeLinkPath(window.location.pathname);
const navLinks = document.querySelectorAll(".nav-link, .dropdown-item");
for (link of navLinks) {
    // Compare the link's pathname with the current URL path
    const linkPath = normalizeLinkPath(link.getAttribute("href"));
    if (linkPath === currentPath) {
        link.classList.add("active");
        break;
    }
}

document.getElementById("footer").replaceChildren(
    fromHTML(`
        <footer class="pt-5">
            <div class="container text-center">
                <p class="text-muted">© <span>${new Date().getFullYear()}</span> <span class="umass">UMass Amherst</span> AI Security
                <br>
                <a class="email" href="mailto:aisec@cs.umass.edu">&#9993; aisec@cs.umass.edu</a>
                </p>
            </div>
        </footer>
    `)
);


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-card, .stats-grid, .expertise-card, .card').forEach(el => {
    observer.observe(el);
});