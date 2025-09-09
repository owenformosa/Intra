// src/main.js
const announcementsContainer = document.getElementById('announcements-container');
const newsContainer = document.getElementById('news-container');

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// Render Announcements
fetchData('/announcements.json').then(data => {
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card bg-base-100 shadow-md p-4 rounded-lg hover:shadow-lg';
    card.innerHTML = `
      <h3 class="text-lg font-bold mb-2">${item.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${formatDate(item.date)}</p>
      <p>${item.content}</p>
    `;
    announcementsContainer.appendChild(card);
  });
}).catch(err => console.error(err));

// Render News
fetchData('/news.json').then(data => {
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card bg-base-100 shadow-md p-4 rounded-lg hover:shadow-lg';
    card.innerHTML = `
      <h3 class="text-lg font-bold mb-2">${item.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${formatDate(item.date)}</p>
      <p>${item.content}</p>
    `;
    newsContainer.appendChild(card);
  });
}).catch(err => console.error(err));
