// click a button or object to earn points so that i can increase my score
//see my current score during the game so that i know how well i am doing

//see a countdown timer so that i know how much time is left. serInterval


//variables
let score= 0;
let timeLeft= 60;
let gameStarted = false;
let gameEnded = false;
let interval = null;


// HTML DOM
const button1 = document.getElementById('button1');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');


// UI Functions and events
button1.addEventListener('click', () => {
if (!gameEnded) {
  increaseScore();
}

if(!gameStarted) {
startGame();
}
  })



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
}
// TODO Make something apper to for the user to imput their name



