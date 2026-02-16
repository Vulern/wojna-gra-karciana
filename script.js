const suits = ["♠","♥","♦","♣"];
const values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const maxRounds = 30;
const handSize = 5;

let round = 0;
let playerScore = 0;
let computerScore = 0;

let playerDeck = [];
let computerDeck = [];
let playerHand = [];
let computerHand = [];

const playerScoreSpan = document.getElementById("playerScore");
const computerScoreSpan = document.getElementById("computerScore");
const roundSpan = document.getElementById("roundCount");
const messageDiv = document.getElementById("message");
const playerHandDiv = document.getElementById("playerHand");
const playerTableDiv = document.getElementById("playerTable");
const computerTableDiv = document.getElementById("computerTable");
const restartButton = document.getElementById("restartButton");

// Modal zasady
const rulesButton = document.getElementById("rulesButton");
const rulesModal = document.getElementById("rulesModal");
const closeModal = document.getElementById("closeModal");

rulesButton.addEventListener("click", () => rulesModal.style.display="block");
closeModal.addEventListener("click", () => rulesModal.style.display="none");
window.addEventListener("click", e => { if(e.target === rulesModal) rulesModal.style.display="none"; });

function valueToText(v) {
    if (v === 11) return "J";
    if (v === 12) return "Q";
    if (v === 13) return "K";
    if (v === 14) return "A";
    return v;
}

function createDeck() {
    const deck = [];
    for(let v of values){
        for(let s of suits){
            deck.push({value:v,suit:s});
        }
    }
    return deck.sort(()=>Math.random()-0.5);
}

function drawHand(deck) {
    const hand = [];
    while(hand.length < handSize && deck.length > 0){
        hand.push(deck.shift());
    }
    return hand;
}

function renderHand(){
    playerHandDiv.innerHTML = '';
    playerHand.forEach((card, idx)=>{
        const cardDiv = document.createElement("div");
        cardDiv.className="card show";
        cardDiv.textContent=valueToText(card.value)+card.suit;
        if(card.suit==="♥"||card.suit==="♦") cardDiv.classList.add("red");
        cardDiv.addEventListener("click", ()=>playRound(idx));
        playerHandDiv.appendChild(cardDiv);
    });
}

function computerPlay(){
    const idx=Math.floor(Math.random()*computerHand.length);
    return computerHand.splice(idx,1)[0];
}

function playRound(playerIdx){
    if(round>=maxRounds) return;

    round++;
    roundSpan.textContent=round;

    const playerCard = playerHand.splice(playerIdx,1)[0];
    const computerCard = computerPlay();

    playerTableDiv.innerHTML='';
    computerTableDiv.innerHTML='';

    const pDiv=document.createElement("div");
    pDiv.className="card show";
    pDiv.textContent=valueToText(playerCard.value)+playerCard.suit;
    if(playerCard.suit==="♥"||playerCard.suit==="♦") pDiv.classList.add("red");
    playerTableDiv.appendChild(pDiv);

    const cDiv=document.createElement("div");
    cDiv.className="card show";
    cDiv.textContent=valueToText(computerCard.value)+computerCard.suit;
    if(computerCard.suit==="♥"||computerCard.suit==="♦") cDiv.classList.add("red");
    computerTableDiv.appendChild(cDiv);

    setTimeout(()=>{
        let winner = null;
        if(playerCard.value>computerCard.value) winner="player";
        else if(playerCard.value<computerCard.value) winner="computer";

        if(winner==="player"){
            playerScore++;
            pDiv.classList.add("win");
            messageDiv.textContent="Gracz wygrywa rundę!";
        } else if(winner==="computer"){
            computerScore++;
            cDiv.classList.add("win");
            messageDiv.textContent="Komputer wygrywa rundę!";
        } else {
            messageDiv.innerHTML="<span class='war'>WOJNA! +2 pkt zwycięzca</span>";
            const playerCard2 = playerHand.shift() || {value:0,suit:"♠"};
            const computerCard2 = computerPlay() || {value:0,suit:"♠"};

            const pDiv2=document.createElement("div");
            pDiv2.className="card show win";
            pDiv2.textContent=valueToText(playerCard2.value)+playerCard2.suit;
            playerTableDiv.appendChild(pDiv2);

            const cDiv2=document.createElement("div");
            cDiv2.className="card show win";
            cDiv2.textContent=valueToText(computerCard2.value)+computerCard2.suit;
            computerTableDiv.appendChild(cDiv2);

            if(playerCard2.value>computerCard2.value) playerScore+=2;
            else if(playerCard2.value<computerCard2.value) computerScore+=2;
        }

        playerScoreSpan.textContent=playerScore;
        computerScoreSpan.textContent=computerScore;

        while(playerHand.length<handSize && playerDeck.length>0) playerHand.push(playerDeck.shift());
        while(computerHand.length<handSize && computerDeck.length>0) computerHand.push(computerDeck.shift());

        renderHand();

        if(round>=maxRounds || (playerHand.length===0 && playerDeck.length===0)) endGame();
    }, 500);
}

function endGame(){
    playerHandDiv.innerHTML='';
    restartButton.style.display="inline-block";
    if(playerScore>computerScore) messageDiv.innerHTML="<h2>🏆 Gracz wygrywa całą grę!</h2>";
    else if(playerScore<computerScore) messageDiv.innerHTML="<h2>💻 Komputer wygrywa całą grę!</h2>";
    else messageDiv.innerHTML="<h2>🤝 Remis!</h2>";
}

function startGame(){
    round=0;
    playerScore=0;
    computerScore=0;
    playerDeck=createDeck();
    computerDeck=createDeck();
    playerHand=drawHand(playerDeck);
    computerHand=drawHand(computerDeck);
    renderHand();
    roundSpan.textContent=round;
    playerScoreSpan.textContent=playerScore;
    computerScoreSpan.textContent=computerScore;
    messageDiv.textContent="";
    playerTableDiv.innerHTML="";
    computerTableDiv.innerHTML="";
    restartButton.style.display="none";
}

restartButton.addEventListener("click", startGame);

startGame();
