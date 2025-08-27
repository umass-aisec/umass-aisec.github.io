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

document.getElementById("footer").replaceChildren(
    fromHTML(`
        <footer class="pt-5">
            <div class="container text-center">
                <p class="text-muted">© <span>${new Date().getFullYear()}</span> <span class="umass">UMass Amherst</span> AI Security
                <br>
                <a class="email" href="mailto:aisec.umass@gmail.com">&#9993; aisec.umass@gmail.com</a>
                </p>
            </div>
        </footer>
    `)
);