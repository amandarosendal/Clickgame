// click a button or object to earn points so that i can increase my score
//see my current score during the game so that i know how well i am doing

//see a countdown timer so that i know how much time is left. serInterval


//variables
let score= 0;
let timeLeft= 60;
let gameStarted = false;


// HTML DOM
const button1 = document.getElementById('button1');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');


// UI Functions and events
button1.addEventListener('click', () => {
increaseScore();
startGame();
})

// TODO start only when "Click Me is Clicked"
setInterval(countdown, 1000);


// Functions
function increaseScore() {
  score++;
 scoreDisplay.innerText = score;
}

function countdown() {
  timeLeft--;
 timerDisplay.innerText = timeLeft;
 // TODO: Stop timer at the end
}

function startGame()
setInterval(countdown, 1000);
gameStarted = true;


function endGame()
