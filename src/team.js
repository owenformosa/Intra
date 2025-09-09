document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('team-container');
  const teamTitle = document.getElementById('team-title');
  const teamDesc = document.getElementById('team-desc');

  // Get department name from URL
  const urlParams = new URLSearchParams(window.location.search);
  const deptName = urlParams.get('id') || "Team";

  teamTitle.textContent = deptName;
  teamDesc.textContent = `Meet the members of the ${deptName} team.`;

  fetch('/teams.json')
    .then(res => res.json())
    .then(data => {
      console.log("Teams JSON:", data);
      const teams = data.teams || [];
      // Filter team members by department
      const members = teams.filter(t => t.department === deptName);

      container.innerHTML = members.length
        ? members.map((m, index) => createCard(m, index)).join("")
        : '<p class="text-center w-full">No team members listed for this department.</p>';
    })
    .catch(err => console.error("Teams fetch error:", err));

  // Gradient sets for members (cycled)
  const gradients = [
    { from: 'from-purple-50', to: 'to-purple-100', text: 'text-purple-900' },
    { from: 'from-blue-50', to: 'to-blue-100', text: 'text-blue-900' },
    { from: 'from-green-50', to: 'to-green-100', text: 'text-green-900' },
    { from: 'from-yellow-50', to: 'to-yellow-100', text: 'text-yellow-900' },
    { from: 'from-pink-50', to: 'to-pink-100', text: 'text-pink-900' }
  ];

  function createCard(member, index) {
    const gradient = gradients[index % gradients.length];

    return `
      <div class="card w-80 bg-gradient-to-br ${gradient.from} ${gradient.to} shadow-lg p-6 rounded-xl
                  transform transition hover:-translate-y-2 hover:scale-105 hover:shadow-2xl">
        <h4 class="text-xl font-bold mb-2 ${gradient.text}">${member.name}</h4>
        <p class="text-gray-800 mb-2">${member.role}</p>
        <p class="text-gray-600 text-sm">${member.email}</p>
      </div>
    `;
  }
});
