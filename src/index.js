document.addEventListener('DOMContentLoaded', () => {
  const announcementsContainer = document.getElementById('announcements-container');
  const newsContainer = document.getElementById('news-container');

  console.log("✅ index.js loaded, containers:", announcementsContainer, newsContainer);

  if (!announcementsContainer || !newsContainer) return;

  // --- Announcements fetch ---
  fetch('./announcements.json')
    .then(res => res.json())
    .then(data => {
      const announcements = data.announcements || [];
      announcementsContainer.innerHTML = announcements.length
        ? announcements.map(item => createCard(item, "announcement")).join("")
        : '<p class="text-center w-full">No announcements available.</p>';
    })
    .catch(err => console.error("Announcements fetch error:", err));

  // --- News fetch ---
  fetch('./news.json')
    .then(res => res.json())
    .then(data => {
      const news = data.news || [];
      newsContainer.innerHTML = news.length
        ? news.map(item => createCard(item, "news")).join("")
        : '<p class="text-center w-full">No news available.</p>';
    })
    .catch(err => console.error("News fetch error:", err));

  // --- Card creation ---
  function createCard(item, type) {
    let fromColor, toColor, textColor;

    if (type === "announcement") {
      fromColor = "from-blue-50";
      toColor = "to-blue-100";
      textColor = "text-blue-900";
    } else if (type === "news") {
      fromColor = "from-green-50";
      toColor = "to-green-100";
      textColor = "text-green-900";
    } else {
      fromColor = "from-gray-50";
      toColor = "to-gray-100";
      textColor = "text-gray-900";
    }

    return `
      <div class="card w-80 bg-gradient-to-br ${fromColor} ${toColor} shadow-lg p-6 rounded-xl
                  transform transition hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
        <h4 class="text-xl font-bold mb-2 ${textColor}">${item.title}</h4>
        <p class="text-gray-500 text-sm mb-3 italic">${formatDate(item.date)}</p>
        <p class="text-gray-800">${item.content}</p>
      </div>
    `;
  }

  // --- Date formatting ---
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }
});
