async function loadRecentNews() {
    const container = document.getElementById("recent-news-list");
    if (!container) return;

    try {
        const response = await fetch("/assets/data/news.json");
        const newsItems = await response.json();

        const recentNews = newsItems
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        container.innerHTML = recentNews.map(item => {
            const isExternal = item.link && item.link.startsWith("http");
            const targetAttrs = isExternal ? 'target="_blank" rel="noopener noreferrer"' : "";

            return `
                <div class="news-item">
                    <img src="${item.image}" alt="${item.alt || item.title}" class="news-item-img">
                    <div class="news-item-content">
                        <span class="news-item-label">${item.label}</span>
                        <div class="news-item-title">
                            <a href="${item.link}" ${targetAttrs}>${item.title}</a>
                        </div>
                        <div class="news-item-meta">${item.description || ""}</div>
                    </div>
                </div>
            `;
        }).join("");
    } catch (error) {
        console.error("Failed to load recent news:", error);
        container.innerHTML = "<p>Recent news could not be loaded.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadRecentNews);
