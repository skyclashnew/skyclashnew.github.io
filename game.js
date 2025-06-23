const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");
const hpDisplay = document.getElementById("hp");

let hp = 100;

function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  const x = Math.random() * (window.innerWidth - 30);
  enemy.style.left = `${x}px`;
  gameContainer.appendChild(enemy);

  const interval = setInterval(() => {
    const enemyRect = enemy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (enemyRect.top < playerRect.top) {
      enemy.style.top = `${enemy.offsetTop + 2}px`;
    } else {
      clearInterval(interval);
      gameContainer.removeChild(enemy);
      hp -= 10;
      hpDisplay.textContent = hp;
      if (hp <= 0) {
        alert("Game Over!");
        location.reload();
      }
    }
  }, 30);
}

function juml() {
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");
  projectile.style.left = `${player.offsetLeft + 15}px`;
  projectile.style.top = `${player.offsetTop}px`;
  gameContainer.appendChild(projectile);

  const interval = setInterval(() => {
    projectile.style.top = `${projectile.offsetTop - 5}px`;

    const enemies = document.querySelectorAll(".enemy");
    enemies.forEach(enemy => {
      const eRect = enemy.getBoundingClientRect();
      const pRect = projectile.getBoundingClientRect();
      if (
        pRect.left < eRect.right &&
        pRect.right > eRect.left &&
        pRect.top < eRect.bottom &&
        pRect.bottom > eRect.top
      ) {
        gameContainer.removeChild(enemy);
        gameContainer.removeChild(projectile);
        clearInterval(interval);
      }
    });

    if (projectile.offsetTop < 0) {
      gameContainer.removeChild(projectile);
      clearInterval(interval);
    }
  }, 20);
}

function hit() {
  const playerRect = player.getBoundingClientRect();
  const enemies = document.querySelectorAll(".enemy");
  enemies.forEach(enemy => {
    const eRect = enemy.getBoundingClientRect();
    if (
      Math.abs(eRect.top - playerRect.top) < 40 &&
      Math.abs(eRect.left - playerRect.left) < 50
    ) {
      gameContainer.removeChild(enemy);
    }
  });
}

// Spawn enemies every 2 seconds
setInterval(spawnEnemy, 2000);
