let allGames = [];
let itemsPerPage = 20;
let currentPage = 1;
let totalGames = 625; // العدد النهائي للألعاب

// تحميل الألعاب
async function loadGames() {
  try {
    const res = await fetch("../JSON-Files/All-Games.json");
    allGames = await res.json();
    renderPage();
  } catch (err) {
    console.error("فشل تحميل الألعاب:", err);
  }
}

// عرض الألعاب الحالية فقط
function renderPage() {
  const grid = document.getElementById("gamesGrid");
  grid.innerHTML = "";

  const start = 0;
  const end = Math.min(currentPage * itemsPerPage, totalGames); // ما نتجاوز 783
  const gamesToShow = allGames.slice(start, end);

  gamesToShow.forEach(game => {
    const card = document.createElement("a");
    card.className = 'game-card animate-fadeIn';
    card.href = game.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
      <img class="game-image" src="${game.image}" alt="${game.title}">
      <div class="game-content">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-category">
          <i class="fas fa-tag game-category-icon"></i>${game.category}
        </p>
      </div>
    `;
    grid.appendChild(card);
  });

  // إخفاء الزر إذا وصلنا للنهاية
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (end >= totalGames) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

// زر "عرض المزيد"
document.getElementById("loadMoreBtn").addEventListener("click", () => {
  currentPage++;
  renderPage();
});

// البحث
document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = allGames.filter(game =>
    game.title.toLowerCase().includes(q) ||
    game.category.toLowerCase().includes(q)
  );

  // إعادة ضبط
  currentPage = 1;
  totalGames = filtered.length;
  renderFiltered(filtered);
});

// عرض الألعاب بعد البحث
function renderFiltered(filteredGames) {
  const grid = document.getElementById("gamesGrid");
  grid.innerHTML = "";

  const end = Math.min(currentPage * itemsPerPage, filteredGames.length);
  const gamesToShow = filteredGames.slice(0, end);

  gamesToShow.forEach(game => {
    const card = document.createElement("a");
    card.className = 'game-card animate-fadeIn';
    card.href = game.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
      <img class="game-image" src="${game.image}" alt="${game.title}">
      <div class="game-content">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-category">
          <i class="fas fa-tag game-category-icon"></i>${game.category}
        </p>
      </div>
    `;
    grid.appendChild(card);
  });

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (end >= filteredGames.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
    // تحميل المزيد من نتائج البحث
    loadMoreBtn.onclick = () => {
      currentPage++;
      renderFiltered(filteredGames);
    };
  }
}

// فتح الصفحة
window.addEventListener("DOMContentLoaded", loadGames);
