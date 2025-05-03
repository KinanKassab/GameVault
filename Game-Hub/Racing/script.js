let allGames = [];
let isMenuOpen = false; // حالة القائمة

async function loadGames() {
  try {
    const all = await fetch("GameList.json").then(res => res.json());
    allGames = all;
    renderGames(allGames);
    applyFilters();
  } catch (err) {
    console.error("حدث خطأ أثناء تحميل البيانات:", err);
  }
}

function renderGames(games) {
  const grid = document.getElementById("gamesGrid");
  grid.innerHTML = '';

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    card.innerHTML = `
      <a href="${game.url}" target="_blank" rel="noopener noreferrer" class="game-link">
        <img src="${game.image}" alt="${game.title}" class="game-image" />
      </a>
      <div class="game-content">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-category"><i class="fas fa-tag"></i> ${game.category}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const filteredGames = allGames.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query)
    );

    renderGames(filteredGames);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  document.getElementById("searchInput")?.addEventListener("input", applyFilters);
  document.getElementById("menuButton")?.addEventListener("click", toggleMenu);
  document.getElementById("closeMenu")?.addEventListener("click", toggleMenu);
  document.getElementById("menuOverlay")?.addEventListener("click", toggleMenu);

  // إضافة event listener للرابط لمنع الانتقال إذا كانت القائمة مغلقة
  document.querySelectorAll('.game-link').forEach(link => {
    link.addEventListener('click', (event) => {
      if (!isMenuOpen) {
        event.preventDefault(); // منع الانتقال للرابط إذا كانت القائمة مغلقة
        console.log('القائمة مغلقة، الرابط غير مفعل.');
      }
    });
  });
});

function toggleMenu() {
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("menuOverlay");
  const body = document.body;

  // التبديل بين حالة القائمة المفتوحة والمغلقة
  isMenuOpen = !isMenuOpen;
  
  nav.classList.toggle("active");
  overlay.classList.toggle("active");
  body.classList.toggle("no-scroll");
}
