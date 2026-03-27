const suits = ["♠", "♥", "♦", "♣"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const maxRounds = 30;

let round = 0;
let playerScore = 0;
let computerScore = 0;

let playerDeck = [];
let computerDeck = [];
let isRoundInProgress = false;

const playerScoreSpan = document.getElementById("playerScore");
const computerScoreSpan = document.getElementById("computerScore");
const playerDeckCountSpan = document.getElementById("playerDeckCount");
const computerDeckCountSpan = document.getElementById("computerDeckCount");
const roundSpan = document.getElementById("roundCount");
const messageDiv = document.getElementById("message");
const playerTableDiv = document.getElementById("playerTable");
const computerTableDiv = document.getElementById("computerTable");
const restartButton = document.getElementById("restartButton");
const playButton = document.getElementById("playButton");

// Modal zasady
const rulesButton = document.getElementById("rulesButton");
const rulesModal = document.getElementById("rulesModal");
const closeModal = document.getElementById("closeModal");

rulesButton.addEventListener("click", () => rulesModal.style.display = "block");
closeModal.addEventListener("click", () => rulesModal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === rulesModal) rulesModal.style.display = "none";
});

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getCardImage(value, suit) {
    const suitMap = {
        "♠": "S",
        "♥": "H",
        "♦": "D",
        "♣": "C"
    };

    let imageValue = value;
    if (value === 10) imageValue = "0";
    if (value === 11) imageValue = "J";
    if (value === 12) imageValue = "Q";
    if (value === 13) imageValue = "K";
    if (value === 14) imageValue = "A";

    return `https://deckofcardsapi.com/static/img/${imageValue}${suitMap[suit]}.png`;
}

function createFullDeck() {
    const deck = [];

    for (const value of values) {
        for (const suit of suits) {
            deck.push({
                value,
                suit,
                img: getCardImage(value, suit)
            });
        }
    }

    return shuffle(deck);
}

function showCard(card, container, isWinner = false) {
    const img = document.createElement("img");
    img.src = card.img;
    img.alt = `Karta ${card.value}${card.suit}`;
    img.className = "card-img show";
    if (isWinner) img.classList.add("win");
    container.appendChild(img);
    return img;
}

function updateStats() {
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    playerDeckCountSpan.textContent = playerDeck.length;
    computerDeckCountSpan.textContent = computerDeck.length;
    roundSpan.textContent = round;
}

function endGame() {
    playButton.disabled = true;
    restartButton.style.display = "inline-block";

    if (playerScore > computerScore) {
        messageDiv.innerHTML = "<h2>🏆 Gracz wygrywa całą grę!</h2>";
    } else if (playerScore < computerScore) {
        messageDiv.innerHTML = "<h2>💻 Komputer wygrywa całą grę!</h2>";
    } else {
        messageDiv.innerHTML = "<h2>🤝 Remis!</h2>";
    }
}

function playRound() {
    if (isRoundInProgress || round >= maxRounds || playerDeck.length === 0 || computerDeck.length === 0) {
        return;
    }

    isRoundInProgress = true;
    playButton.disabled = true;

    round++;
    playerTableDiv.innerHTML = "";
    computerTableDiv.innerHTML = "";

    const playerCard = playerDeck.shift();
    const computerCard = computerDeck.shift();

    const playerCardImg = showCard(playerCard, playerTableDiv);
    const computerCardImg = showCard(computerCard, computerTableDiv);

    updateStats();

    setTimeout(() => {
        if (playerCard.value > computerCard.value) {
            playerScore++;
            playerCardImg.classList.add("win");
            messageDiv.textContent = "Gracz wygrywa rundę!";
        } else if (playerCard.value < computerCard.value) {
            computerScore++;
            computerCardImg.classList.add("win");
            messageDiv.textContent = "Komputer wygrywa rundę!";
        } else {
            messageDiv.innerHTML = "<span class='war'>WOJNA! +2 pkt zwycięzca</span>";

            const playerWarCard = playerDeck.shift();
            const computerWarCard = computerDeck.shift();

            if (playerWarCard && computerWarCard) {
                playerTableDiv.innerHTML = "";
                computerTableDiv.innerHTML = "";

                showCard(playerWarCard, playerTableDiv);
                showCard(computerWarCard, computerTableDiv);

                if (playerWarCard.value > computerWarCard.value) {
                    playerScore += 2;
                    playerTableDiv.lastChild.classList.add("win");
                    messageDiv.innerHTML = "<span class='war'>WOJNA!</span><br>Gracz wygrywa wojnę i dostaje 2 pkt!";
                } else if (playerWarCard.value < computerWarCard.value) {
                    computerScore += 2;
                    computerTableDiv.lastChild.classList.add("win");
                    messageDiv.innerHTML = "<span class='war'>WOJNA!</span><br>Komputer wygrywa wojnę i dostaje 2 pkt!";
                } else {
                    messageDiv.innerHTML = "<span class='war'>PODWÓJNA WOJNA!</span><br>Brak punktów w tej rundzie.";
                }
            } else {
                messageDiv.innerHTML = "<span class='war'>WOJNA!</span><br>Za mało kart, aby ją rozegrać.";
            }
        }

        updateStats();

        if (round >= maxRounds || playerDeck.length === 0 || computerDeck.length === 0) {
            endGame();
        } else {
            playButton.disabled = false;
        }

        isRoundInProgress = false;
    }, 500);
}

function startGame() {
    round = 0;
    playerScore = 0;
    computerScore = 0;
    isRoundInProgress = false;

    const fullDeck = createFullDeck();
    playerDeck = fullDeck.slice(0, 26);
    computerDeck = fullDeck.slice(26);

    playerTableDiv.innerHTML = "";
    computerTableDiv.innerHTML = "";
    messageDiv.textContent = "Kliknij „Dobierz kartę”, aby rozpocząć.";

    restartButton.style.display = "none";
    playButton.disabled = false;

    updateStats();
}

playButton.addEventListener("click", playRound);
restartButton.addEventListener("click", startGame);

startGame();
