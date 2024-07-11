const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = tileSize;
let dy = 0;
let score = 0;
let changingDirection = false;
let gameRunning = false; // Flag to track if the game is running
let gameInterval = null; // Interval variable to hold game loop

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#0f0";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

function drawFood() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx / tileSize, y: snake[0].y + dy / tileSize };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / tileSize));
  food.y = Math.floor(Math.random() * (canvas.height / tileSize));
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width / tileSize ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height / tileSize ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    return true;
  }
  return false;
}

function changeDirection(direction) {
  if (changingDirection) return;
  changingDirection = true;
  
  if (direction === "up" && dy === 0) {
    dx = 0;
    dy = -tileSize;
  } else if (direction === "down" && dy === 0) {
    dx = 0;
    dy = tileSize;
  } else if (direction === "left" && dx === 0) {
    dx = -tileSize;
    dy = 0;
  } else if (direction === "right" && dx === 0) {
    dx = tileSize;
    dy = 0;
  }
}

function handleButtonClick(event) {
  const direction = event.target.id.replace("Btn", "").toLowerCase();
  changeDirection(direction);
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    document.getElementById("startBtn").disabled = true; // Disable start button once game starts
    document.getElementById("restartBtn").disabled = false; // Enable restart button
    gameInterval = setInterval(gameLoop, 150); // Adjust game speed here (higher interval = slower movement)
  }
}

function restartGame() {
  clearInterval(gameInterval); // Clear previous game interval
  snake = [{ x: 10, y: 10 }]; // Reset snake position
  dx = tileSize; // Reset snake direction
  dy = 0;
  score = 0; // Reset score
  document.getElementById("score").innerText = "Score: " + score; // Update score display
  generateFood(); // Generate new food position
  gameRunning = false; // Set gameRunning to false
  document.getElementById("startBtn").disabled = false; // Enable start button
  clearCanvas(); // Clear canvas
}

function gameLoop() {
  if (checkCollision()) {
    clearInterval(gameInterval); // Stop game loop on collision
    alert("Game Over! Your score: " + score);
    restartGame(); // Restart game after collision
    return;
  }

  changingDirection = false;
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();
}

document.getElementById("upBtn").addEventListener("click", handleButtonClick);
document.getElementById("leftBtn").addEventListener("click", handleButtonClick);
document.getElementById("rightBtn").addEventListener("click", handleButtonClick);
document.getElementById("downBtn").addEventListener("click", handleButtonClick);

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", restartGame);

document.addEventListener("keydown", (event) => {
  const direction = event.key.replace("Arrow", "").toLowerCase();
  if (direction === "up" && dy === 0) {
    changeDirection(direction);
  } else if (direction === "down" && dy === 0) {
    changeDirection(direction);
  } else if (direction === "left" && dx === 0) {
    changeDirection(direction);
  } else if (direction === "right" && dx === 0) {
    changeDirection(direction);
  }
});
