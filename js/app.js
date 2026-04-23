// Här kopplar jag ihop JavaScript med HTML-sidan.


const startBtn = document.getElementById("startBtn");

// Klickknappen som spelaren trycker på under spelet
const clickBtn = document.getElementById("clickBtn");

// Sparar spelarens resultat efter spelet
const saveBtn = document.getElementById("saveBtn");

// Knappen som rensar hela scoreboarden
const resetBtn = document.getElementById("resetBtn");

// Inputfältet där spelaren skriver in sitt namn
const playerNameInput = document.getElementById("playerName");

// Elementet där spelarens poäng visas på sidan
const scoreEl = document.getElementById("score");

// Elementet där tiden visas på sidan
const timerEl = document.getElementById("timer");

// Elementet där meddelanden ska visas, som: Spelet har startat!"
const messageEl = document.getElementById("message");

// Själva listan där scoreboarden visas
const scoreboardList = document.getElementById("scoreboardList");


// Variabler som ändras under spelets gång, därför använder vi let.
// Sparar spelarens nuvarande poäng. Spelet börjar alltid på 0 poäng.
let score = 0;

// Så många sekunder som är kvar av spelet. Spelet börjar med 60 sekunder.
let timeLeft = 60;

// Sparar om spelet är aktivt eller inte. false = spelet är inte igång, true = spelet är igång
// Bra tillåter klick när spelet har startat.
let gameActive = false;

// Timern från setInterval. I början finns ingen timer än, därför sätter vi den till null.
let countdown = null;


// FUNKTION: VISA MEDDELANDE TILL ANVÄNDAREN
// text = själva texten som ska visas
// isSuccess = avgör om texten ska bli grön eller röd
// = true betyder att om vi inte skickar med något andra värde
// så blir isSuccess automatiskt true.
function showMessage(text, isSuccess = true) {
  // Här sätter vi texten i meddelande-elementet till den text vi skickade in.
  // Om text = "Spelet har startat!" då kommer det stå exakt det på sidan.
  messageEl.textContent = text;

  // Ändrar färgen på texten. Om isSuccess är true, använd "green" Annars, använd "crimson"
  messageEl.style.color = isSuccess ? "green" : "crimson";
}

function updateDisplay() {
  // Aktuella poängen i HTML-elementet för score
  scoreEl.textContent = score;

  // Aktuell tid kvar i HTML-elementet för timer
  timerEl.textContent = timeLeft;
}

// Funktionen körs när användaren klickar på startknappen. Då ska spelet börja om från början.
function startGame() {
  // När ett nytt spel startar vill vi börja från 0 poäng.
  score = 0;

  // Återställa tiden till 60 sekunder.
  timeLeft = 60;

  // Markerar att spelet är igång.
  gameActive = true;

  // Uppdaterar det som visas på skärmen direkt, så att sidan visar 0 poäng och 60 sekunder.
  updateDisplay();

  // Visar ett grönt meddelande till användaren om att spelet har startat.
  showMessage("Spelet har startat!");


  // AKTIVERA OCH STÄNG AV RÄTT KNAPPAR
  // disabled = true betyder att knappen/inputen inte går att använda
  // disabled = false betyder att den går att använda

  // Nu när spelet har startat måste klickknappen vara aktiva så att spelaren kan samla poäng.
  clickBtn.disabled = false;

  // Man ska inte kunna spara sin score medan spelet fortfarande pågår, därför avstängd spara-knapp.
  saveBtn.disabled = true;

  // Man ska inte kunna trycka på start igen mitt i ett spel, därför avstängd startknapp.
  startBtn.disabled = true;

  // Inte kunna ändra sitt namn mitt under spelet, därför avstängd namn-input.
  playerNameInput.disabled = true;

  // STARTA TIMER / NEDRÄKNING
  // setInterval betyder: "Kör den här koden om och om igen med ett visst mellanrum"
  // Kör den i 1 sekund.
  // Sparar intervallet i variabeln countdown,för att senare kan stoppa den i endGame.
  countdown = setInterval(() => {
    // Varje sekund minskas tiden med 1.
    timeLeft--;

    // Efter tiden ändrats måste sidan uppdateras annars syns inte förändringen för användaren.
    updateDisplay();

    // Kontroll om tiden är slut. Om timeLeft är 0 eller mindre ska spelet avslutas.
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}


// FUNKTION: AVSLUTA SPELET , körs när tiden är slut, spelet stoppas och användaren ska kunna spara sitt resultat.
function endGame() {
  // clearInterval stoppar timern som startades med setInterval annars kommer tiden fortsätta ticka ner.
  clearInterval(countdown);

  // Spelet är inte längre igång.
  gameActive = false;


  // UPPDATERA KNAPPAR OCH INPUT EFTER ATT SPELET TAGIT SLUT. När spelet är slut ska man inte kunna klicka mer.
  clickBtn.disabled = true;

  // Spara sin score, aktivera spara-knappen.
  saveBtn.disabled = false;

  // Får starta nytt spel, startknappen aktiveras igen.
  startBtn.disabled = false;

  // Namnfältet aktivt igen så att man kan skriva/ändra namn.
  playerNameInput.disabled = false;

  // Visar vi ett meddelande där spelarens slutpoäng står med.` ` används för template strings så jg kan lägga in variabler direkt med ${...}
  // Om score är 45 blir texten: "Spelet är slut! Din slutpoäng blev 45."
  showMessage(`Spelet är slut! Din slutpoäng blev ${score}.`);
}


// FUNKTION: NÄR ANVÄNDAREN KLICKAR PÅ KLICKKNAPPEN
// Funktionen körs varje gång spelaren trycker på klickknappen.
function handleClick() {
  // Kontrollerar om spelet är igång. !gameActive betyder "inte gameActive"
  // Så om gameActive är false betyder det: "Spelet är inte igång"
  if (!gameActive) {
    // return betyder "avsluta funktionen direkt"
    return;
  }

  // Om spelet är igång får spelaren 1 poäng för klicket.
  score++;

  // Efter att poängen ökat måste vi uppdatera sidan så att användaren ser nya poängen direkt.
  updateDisplay();
}


// FUNKTION: HÄMTA SPARADE SCORES FRÅN LOCAL STORAGE (webbläsarens inbyggda minne) Data sparas vid reload av sida.
// Den här funktionen hämtar tidigare sparade resultat.
function getScores() {
  // Hämta det som finns sparat under nyckeln "clickGameScores". Om det finns sparad data får vi tillbaka den som text.
  const saved = localStorage.getItem("clickGameScores");
  // Om saved finns, gör om texten till riktig JavaScript-data med JSON.parse(saved)
  // Om saved inte finns -> returnera en tom array för att kunna jobba med listor av scores även om det inte finns några ännu.
  return saved ? JSON.parse(saved) : [];
}

// FUNKTION: SPARA SCORES I LOCAL STORAGE. Den här funktionen tar emot en lista med scores och sparar i webbläsarens minne.
function saveScores(scores) {
  // localStorage kan bara spara text. Därför gör om arrayen/objekten till text.
  // JSON.stringify gör om JavaScript-data till en textsträng.
  localStorage.setItem("clickGameScores", JSON.stringify(scores));
}


// FUNKTION: VISA SCOREBOARD PÅ SIDAN, tar alla sparade resultat och skriver ut dem i HTML-listan.
function renderScoreboard() {
  //Hämtar alla sparade resultat.
  const scores = getScores();

  // Tömmer vi listan helt. Annars är gamla resultat kvar och dubblas.
  scoreboardList.innerHTML = "";

  // Om det inte finns några scores alls, då visar vi ett meddelande i listan istället.
  if (scores.length === 0) {
    scoreboardList.innerHTML = "<li>Inga resultat sparade ännu.</li>";

    // return gör att funktionen avslutas här. Då går den inte vidare till loopen längre ner.
    return;
  }

  // forEach loopar igenom varje resultat i arrayen scores.
  // entry = själva resultatet, index = vilken plats i listan objektet ligger på, börjar från 0
  scores.forEach((entry, index) => {
    // Här skapar vi ett nytt li-element, en ny rad i listan.
    const li = document.createElement("li");

    // Texten som ska stå i den raden.
    // index + 1 ger platsnummer 1, 2, 3... annars börjar index på 0.
    // entry.name är spelarens namn
    // entry.score är spelarens poäng
    li.textContent = `${index + 1}. ${entry.name} — ${entry.score} poäng`;

    // Den nya raden i scoreboard-listan på sidan.
    scoreboardList.appendChild(li);
  });
}

// FUNKTION: SPARA EN SPELARES SCORE, Körs när användaren klickar på spara-knappen.
function saveScore() {
  // Hämtar texten som användaren skrivit i namn-inputen. .value = det som står i inputfältet
  // .trim() = tar bort onödiga mellanslag i början och slutet
  const name = playerNameInput.value.trim();

  // Om användaren inte skrivit något namn alls, visas ett felmeddelande. False gör att texten bli röd.
  if (name === "") {
    showMessage("Du måste skriva ditt namn först.", false);

    // return stoppar funktionen direkt så inget sparas.
    return;
  }


  // Får inte spara under pågående spel.
  if (gameActive) {
    // Om spelet fortfarande är aktivt visas felmeddelande.
    showMessage("Du kan spara först när spelet är slut.", false);

    // Stoppar funktionen direkt.
    return;
  }

  // Hämtar sparade scores från localStorage.
  const scores = getScores();

  // Lägger till spelarens nya resultat i arrayen. name: spelarens namn, score: spelarens poäng
  scores.push({ name, score });

  // Sorterar arrayen så högsta poängen hamnar först. b.score till a.score betyder fallande ordning.
  // Om b är större än a hamnar b före a.
  scores.sort((a, b) => b.score - a.score);

  // Här tar vi bara de 10 första resultaten. slice(0, 10) betyder: börja från index 0, ta upp till men inte med index 10
  const top10 = scores.slice(0, 10);

  // Sparar den nya topplistan i localStorage.
  saveScores(top10);

  // Uppdaterar listan på sidan så att användaren ser resultatet direkt.
  renderScoreboard();

  // Visar ett grönt meddelande om att resultatet sparades.
  showMessage("Din score sparades!");

  // Stänger av spara-knappen igen så att användaren inte klickar spara flera gånger.
  saveBtn.disabled = true;
}

// FUNKTION: RENSAR HELA SCOREBOARDEN
// Den här funktionen körs när användaren klickar på reset-knappen.
function resetScoreboard() {
  // Tar bort den sparade datan från localStorage.
  localStorage.removeItem("clickGameScores");

  // Bygger om scoreboarden på sidan direkt, listan blir "Inga resultat sparade ännu."
  renderScoreboard();

  // Visar meddelande till användaren om att scoreboarden rensades.
  showMessage("Scoreboard rensad.");
}

// Event listener betyder att JavaScript "lyssnar" efter något som händer. Lyssnar efter klick på olika knappar.
// Klick på start-knappen kör startGame
startBtn.addEventListener("click", startGame);

// Klick på klick-knappen kör handleClick
clickBtn.addEventListener("click", handleClick);

// Klick på spara-knappen kör saveScore
saveBtn.addEventListener("click", saveScore);

// Klick på reset-knappen kör resetScoreboard
resetBtn.addEventListener("click", resetScoreboard);

// KOD SOM KÖRS DIREKT NÄR SIDAN LADDAS. Körs direkt när JavaScript-filen laddas in i sidan.
// Scoreboarden visas direkt. Finns det gamla sparade resultat så syns de direkt när sidan öppnas.
renderScoreboard();

// Här visas startvärdena för poäng och tid direkt på sidan. Då ser användaren rätt siffror från början.
updateDisplay();
