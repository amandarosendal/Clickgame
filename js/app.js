//Hämtar alla HTML-element så vi kan styra dem med JavaScript
const startBtn = document.getElementById("startBtn");
const clickBtn = document.getElementById("clickBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const playerNameInput = document.getElementById("playerName");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message");
const scoreboardList = document.getElementById("scoreboardList");

// Variabler som håller spelets state (nuvarande läge)
let score = 0;          // spelarens poäng
let timeLeft = 60;     // tid kvar i sekunder
let gameActive = false; // om spelet är igång eller inte
let countdown = null;   // referens till timer (setInterval)


// Visar ett meddelande till användaren
function showMessage(text, isSuccess = true) {
  messageEl.textContent = text;
  messageEl.style.color = isSuccess ? "green" : "crimson";
}

// Uppdaterar UI med aktuell poäng och tid
function updateDisplay() {
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
}

// Startar spelet
function startGame() {
  score = 0;        // reset score
  timeLeft = 60;    // reset timer
  gameActive = true;

  updateDisplay();
  showMessage("Spelet har startat!");

  // Aktivera/avaktivera knappar
  clickBtn.disabled = false;
  saveBtn.disabled = true;
  startBtn.disabled = true;
  playerNameInput.disabled = true;

  // Startar nedräkning varje sekund
  countdown = setInterval(() => {
    timeLeft--;
    updateDisplay();

    // När tiden är slut avslutas spelet
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Avslutar spelet
function endGame() {
  clearInterval(countdown); // stoppar timern
  gameActive = false;

  // Uppdaterar UI
  clickBtn.disabled = true;
  saveBtn.disabled = false;
  startBtn.disabled = false;
  playerNameInput.disabled = false;

  showMessage(`Spelet är slut! Din slutpoäng blev ${score}.`);
}

// När man klickar på klick-knappen
function handleClick() {
  // Säkerställer att man bara kan klicka när spelet är igång
  if (!gameActive) {
    return;
  }

  score++; // ökar poängen
  updateDisplay();
}

// Hämtar sparade scores från localStorage (webbläsarens minne)
function getScores() {
  const saved = localStorage.getItem("clickGameScores");
  return saved ? JSON.parse(saved) : [];
}

// Sparar scores i localStorage
function saveScores(scores) {
  localStorage.setItem("clickGameScores", JSON.stringify(scores));
}

// Visar scoreboard i listan
function renderScoreboard() {
  const scores = getScores();
  scoreboardList.innerHTML = "";

  // Om inga scores finns
  if (scores.length === 0) {
    scoreboardList.innerHTML = "<li>Inga resultat sparade ännu.</li>";
    return;
  }

  // Loopar igenom alla scores och visar dem
  scores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} — ${entry.score} poäng`;
    scoreboardList.appendChild(li);
  });
}

// Sparar en spelares score
function saveScore() {
  const name = playerNameInput.value.trim();

  // Validering: måste ha namn
  if (name === "") {
    showMessage("Du måste skriva ditt namn först.", false);
    return;
  }

  // Kan inte spara medan spelet pågår
  if (gameActive) {
    showMessage("Du kan spara först när spelet är slut.", false);
    return;
  }

  const scores = getScores();

  // Lägger till ny score
  scores.push({ name, score });

  // Sorterar så högsta score kommer först
  scores.sort((a, b) => b.score - a.score);

  // Sparar bara topp 10
  const top10 = scores.slice(0, 10);
  saveScores(top10);

  renderScoreboard();

  showMessage("Din score sparades!");
  saveBtn.disabled = true;
}

// Rensar hela scoreboarden
function resetScoreboard() {
  localStorage.removeItem("clickGameScores");
  renderScoreboard();
  showMessage("Scoreboard rensad.");
}

// Event listeners (kopplar funktioner till klick)
startBtn.addEventListener("click", startGame);
clickBtn.addEventListener("click", handleClick);
saveBtn.addEventListener("click", saveScore);
resetBtn.addEventListener("click", resetScoreboard);

// Körs direkt när sidan laddas
renderScoreboard();
updateDisplay();
