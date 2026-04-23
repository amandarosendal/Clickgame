// Variabler
let score = 0;          // spelarens poäng
let timeLeft = 60;     // tiden som är kvar i sekunder
let gameActive = false; // om spelet är igång eller inte
let countdown = null;   // referens till timer (setInterval)


// Hämtar in alla HTML-element så vi kan styra dem med JavaScript
const startBtn = document.getElementById("startBtn");
const clickBtn = document.getElementById("clickBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const playerNameInput = document.getElementById("playerName");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message");
const scoreboardList = document.getElementById("scoreboardList");


// UI Functions and events
button1.addEventListener('click', () => {
if (!gameEnded) {
  increaseScore();
}

if(!gameStarted) {
startGame();
}
  })



input.style.display = "none"
label1.style.display = "none"


// Functions
function increaseScore() {
  score++;
 scoreDisplay.innerText = score;
}

function countdown() {
  timeLeft--;
 timerDisplay.innerText = timeLeft;

 if (timeLeft <= 0) {
   timerDisplay.innerText = 0;
   endGame();
 }
}

function startGame() {
 interval = setInterval(countdown, 1000);
  gameStarted = true;
}

function endGame() {
gameEnded = true;
clearInterval(interval);
button1.style.display = "none";
input1.style.display = "block";
label1.style.display = "block";
button2.style.display = "block";
}

function sumitHighScore() {
  console.log(input1.value);
  // TODO post value to api from ben
}


