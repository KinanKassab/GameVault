document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector("#menuButton");
    const menu = document.querySelector("#mobileNav");
    const overlay = document.querySelector("#menuOverlay");
    const gamesGrid = document.querySelector(".games-grid");
  
    function toggleMenu() {
      const isOpen = menu.classList.toggle("active");
      overlay.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", isOpen);
    }
  
    menuButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  
    // قائمة الألعاب المبدئية
    const GAMES = [
      { id: '1', title: 'Neon Puzzle', category: 'Brain Teasers', platform: 'PC', releaseDate: '2023-03-01', popularity: 90, imageUrl: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89?w=800&q=80', description: 'Solve glowing puzzles in cybernetic environments', link: '#' },
      { id: '2', title: 'Quantum Runner', category: 'Action', platform: 'Mobile', releaseDate: '2022-12-15', popularity: 85, imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', description: 'Dash through multidimensional space', link: '#' },
      { id: '3', title: 'Cyber Battleground', category: 'Multiplayer', platform: 'Console', releaseDate: '2023-01-20', popularity: 88, imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', description: 'Team-based VR warfare arena', link: '#' }
    ];
  
    // توليد عناصر الألعاب داخل قسم Featured Games
    function renderGames() {
      gamesGrid.innerHTML = "";
      GAMES.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
          <img src="${game.imageUrl}" alt="${game.title}" class="game-image">
          <h3 class="game-title">${game.title}</h3>
          <p class="game-category">${game.category} | <span class="game-platform">${game.platform}</span></p>
        `;
        gamesGrid.appendChild(gameCard);
      });
    }
  
    renderGames();
  });
  