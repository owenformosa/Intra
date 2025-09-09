document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('departments-container');

  fetch('/departments.json')
    .then(res => res.json())
    .then(data => {
      console.log("Departments JSON:", data);
      const departments = data.departments || [];
      container.innerHTML = departments.length
        ? departments.map((dep, index) => createCard(dep, index)).join("")
        : '<p class="text-center w-full">No departments available.</p>';
    })
    .catch(err => console.error("Departments fetch error:", err));

  // Gradient sets for departments (cycled if more than available)
  const gradients = [
    { from: 'from-purple-50', to: 'to-purple-100', text: 'text-purple-900' },
    { from: 'from-blue-50', to: 'to-blue-100', text: 'text-blue-900' },
    { from: 'from-green-50', to: 'to-green-100', text: 'text-green-900' },
    { from: 'from-yellow-50', to: 'to-yellow-100', text: 'text-yellow-900' },
    { from: 'from-pink-50', to: 'to-pink-100', text: 'text-pink-900' }
  ];

  function createCard(dep, index) {
    const gradient = gradients[index % gradients.length];

    return `
      <div class="card w-80 bg-gradient-to-br ${gradient.from} ${gradient.to} shadow-lg p-6 rounded-xl
                  transform transition hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
        <h4 class="text-xl font-bold mb-2 ${gradient.text}">${dep.name}</h4>
        <p class="text-gray-800 mb-4">${dep.description || ''}</p>
        <a href="/team.html?id=${encodeURIComponent(dep.name)}" 
           class="text-blue-600 hover:underline font-medium">View Team</a>
      </div>
    `;
  }
});
