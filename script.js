const suits = ["♠","♥","♦","♣"];
const values = [2,3,4,5,6,7,8,9,10,11,12,13,14];

let deck = [];
let player = [];
let computer = [];
let round = 0;

const playerCardDiv = document.getElementById("playerCard");
const computerCardDiv = document.getElementById("computerCard");
const messageDiv = document.getElementById("message");
const playerCountSpan = document.getElementById("playerCount");
const computerCountSpan = document.getElementById("computerCount");
const roundSpan = document.getElementById("roundCount");
const playButton = document.getElementById("playButton");

function createDeck() {
    deck = [];
    for (let v of values) {
        for (let s of suits) {
            deck.push({value: v, suit: s});
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

function initGame() {
    createDeck();
    player = deck.slice(0,26);
    computer = deck.slice(26);
    updateCounts();
}

function valueToText(v) {
    if (v === 11) return "J";
    if (v === 12) return "Q";
    if (v === 13) return "K";
    if (v === 14) return "A";
    return v;
}

function showCard(element, card) {
    element.classList.remove("show");
    setTimeout(() => {
        element.textContent = valueToText(card.value) + card.suit;
        element.className = "card show";
        if (card.suit === "♥" || card.suit === "♦") {
            element.classList.add("red");
        }
    }, 100);
}

function playRound(pile = []) {

    if (player.length === 0 || computer.length === 0) {
        endGame();
        return;
    }

    round++;
    roundSpan.textContent = round;
    messageDiv.innerHTML = "";

    let playerCard = player.shift();
    let computerCard = computer.shift();

    pile.push(playerCard, computerCard);

    showCard(playerCardDiv, playerCard);
    showCard(computerCardDiv, computerCard);

    setTimeout(() => {
        if (playerCard.value > computerCard.value) {
            player.push(...pile);
            messageDiv.textContent = "Gracz wygrywa rundę!";
        } else if (playerCard.value < computerCard.value) {
            computer.push(...pile);
            messageDiv.textContent = "Komputer wygrywa rundę!";
        } else {
            messageDiv.innerHTML = "<span class='war'>WOJNA!</span>";
            if (player.length < 2 || computer.length < 2) {
                endGame();
                return;
            }
            setTimeout(() => playRound(pile), 1000);
            return;
        }

        updateCounts();
        checkWinner();
    }, 800);
}

function updateCounts() {
    playerCountSpan.textContent = player.length;
    computerCountSpan.textContent = computer.length;
}

function checkWinner() {
    if (player.length === 0 || computer.length === 0) {
        endGame();
    }
}

function endGame() {
    playButton.disabled = true;
    let msg = player.length > computer.length 
        ? "🏆 Gracz wygrywa całą grę!" 
        : "💻 Komputer wygrywa całą grę!";
    messageDiv.innerHTML = "<h2>" + msg + "</h2>";
}

playButton.addEventListener("click", () => playRound());

initGame();
