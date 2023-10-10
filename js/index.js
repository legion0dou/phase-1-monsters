document.addEventListener("DOMContentLoaded", () => {
    const monsterList = document.getElementById("monster-list");
    const monsterForm = document.getElementById("monster-form");
    const loadButton = document.getElementById("load-monsters");
    let currentPage = 1;
  
    loadButton.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    monsterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
  
      createMonster(name, age, description);
      monsterForm.reset();
    });
  
    function fetchMonsters(page) {
      const limit = 50;
      const url = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((monsters) => {
          monsters.forEach((monster) => {
            const monsterCard = createMonsterCard(monster);
            monsterList.appendChild(monsterCard);
          });
        });
    }
  
    function createMonster(name, age, description) {
      const url = "http://localhost:3000/monsters";
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const monsterData = { name, age, description };
  
      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(monsterData),
      })
        .then((response) => response.json())
        .then((monster) => {
          const monsterCard = createMonsterCard(monster);
          monsterList.appendChild(monsterCard);
        });
    }
  
    function createMonsterCard(monster) {
      const card = document.createElement("div");
      card.classList.add("monster-card");
      card.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      return card;
    }
  
    // Initial fetch when the page loads
    fetchMonsters(currentPage);
  });
  