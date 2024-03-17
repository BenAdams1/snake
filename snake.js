// TO FIND CANVAS & TELL IT IS A 2D GAME ================================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); // Ask the canvas for 2d
let speed = 7; // speed of original snake until it grows

// SNAKE PARTS ==========================================================
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let tileCount = 20; // number of tiles 400 / 20 * 2 = tileCount
let tileSize = canvas.width / tileCount - 2; // this is so it wont take up the entire space of the tile (snake or fruit) ~ 20 - 2 = 18 for size of tile
let headX = 10; // this will start the snake head in the middle at beginning of game
let headY = 10; // this will start the snake head in the middle at beginning of game

// SNAKE PART ARRAY =====================================================
const snakeParts = [];
let tailLength = 2;

// STARTING POSITION OF FRUIT ON BOARD ==================================
let appleX = 5;
let appleY = 5;

// TO MAKE THE SNAKE MOVE -- HAVE X & Y VELOCITIES ======================
let xVelocity = 0;
let yVelocity = 0;

// SCORE ================================================================
let score = 0;

// GAME LOOPS ===========================================================
function drawGame() {
  changeSnakePosition(); // runs first bc if it runs into a wall or itself, we
  // need to run code to say game over
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

// GAME OVER FUNCTION ====================================================
function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
    // to make sure game starts from beginning bc game only starts with velocity
  }

  // IF YOU HIT THE WALLS
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }
  // GAME OVER (IF YOU BITE YOURSELF)=======================================
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) gameOver = true;
    break;
  }
  // GAME OVER FILL STYLE/TEXT =============================================
  if (gameOver) {
    ctx.fillStyle = "#fff";
    ctx.font = "50px Verdana";

    ctx.fillText("GAME OVER!", canvas.width / 6.5, canvas.height / 2); // Arbitrary width & height / by 6.5 and 2
  }
  return gameOver;
}

// SCORE FUNCTION ==========================================================
function drawScore() {
  ctx.fillStyle = "#fff"; // color for brush
  ctx.font = "10px Arial"; // font size and style
  ctx.fillText("Score " + score, canvas.width - 50, 10); // to update score and position of score on scoreboard
}

// BACKGROUND OF CANVAS ===================================================
function clearScreen() {
  ctx.fillStyle = "black"; //like a paintbrush with black color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// DRAW THE SNAKE =========================================================
function drawSnake() {
  ctx.fillStyle = "rgb(124,252,0)"; // Snake tail
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new SnakePart(headX, headY)); // put an item at the end of the list next to the head
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthest item from the snake parts if have more than our tail size
  }
  // SNAKE HEAD
  ctx.fillStyle = "rgb(0,128,0)";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize); //location and size of snake
}

// CHANGE THE SNAKE POSITION ==============================================
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

// DRAW THE FRUIT =========================================================
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// COLLISION DETECTION WITH FRUIT =========================================
function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++; // When there is a collision, tailLength increases by a block
    score++; // To increase score when fruit is eaten
  }
}

// ADD EVENT LISTENERS TO ARROW KEYS ======================================
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  // event listens for the keycodes on keyboard
  // FOR UP:
  if (event.keyCode == 38) {
    // if (yVelocity == 1) return; // You're not allowed to do this so not to eat own self when body grows
    yVelocity = -1;
    xVelocity = 0;
  }
  // FOR DOWN:
  if (event.keyCode == 40) {
    // if (yVelocity == -1) return; // You're not allowed to do this so not to eat own self when body grows
    yVelocity = 1;
    xVelocity = 0;
  }
  // FOR LEFT:
  if (event.keyCode == 37) {
    // if (xVelocity == 1) return; // You're not allowed to do this so not to eat own self when body grows
    yVelocity = 0;
    xVelocity = -1;
  }
  // FOR RIGHT:
  if (event.keyCode == 39) {
    // if (xVelocity == -1) return; // You're not allowed to do this so not to eat own self when body grows
    yVelocity = 0;
    xVelocity = 1;
  }
}
drawGame();
