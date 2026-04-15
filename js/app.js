// click a button or object to earn points so that i can increase my score
//see my current score during the game so that i know how well i am doing
//see a countdown timer so that i know how much time is left. serInterval


//variables
let score= 0;

// HTML DOM
const button1 = document.getElementById('button1');
const scoreDisplay = document.getElementById('scoreDisplay');


// UI Functions
button1.addEventListener('click', () => {
increaseScore();
})


// Functions
function increaseScore() {
  score++;
 scoreDisplay.innerText = score;
}
