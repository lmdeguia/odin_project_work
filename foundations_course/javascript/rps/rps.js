
let getComputerChoice = () => {
    let computerMapping = {0:'Rock', 1:'Paper', 2:'Scissors'};
    let randint = () => Math.floor(Math.random() * 3);
    return computerMapping[randint()];
};

let playerScore = 0;
let computerScore = 0;

let playerScoreVal = document.querySelector("#playerScore");
let computerScoreVal = document.querySelector("#computerScore");


function updateScore(winner){
    if (winner === 'player'){
        playerScore++;
        playerScoreVal.textContent = `Player: ${playerScore}`;
    }else if (winner === 'computer'){
        computerScore++;
        computerScoreVal.textContent = `Computer:${computerScore}`;
    }
}


let playRound = (playerSelection, computerSelection) => {
    let container = document.querySelector(".container");

    let prev_roundtext = document.getElementById("temp");
    if (prev_roundtext){
        prev_roundtext.remove();
    }

    let roundtext = document.createElement("p");
    roundtext.setAttribute("id", "temp");
    roundtext.setAttribute("style", "text-align: center;")
    let win_mapping = {'Rock':'Scissors', 'Scissors':'Paper', 'Paper':'Rock'};

    if (playerSelection === computerSelection){
        roundtext.textContent = "Match is a draw!";
        container.appendChild(roundtext);
    }else if (win_mapping[playerSelection] === computerSelection){
        roundtext.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
        container.appendChild(roundtext);
        updateScore('player');
    }else if (win_mapping[computerSelection] === playerSelection){
        roundtext.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
        container.appendChild(roundtext);
        updateScore('computer');
}};



let playerChoices = Array.from(document.querySelectorAll(".choice"));
playerChoices.forEach(
    btn => btn.addEventListener('click', 
        () => {
            var playerChoice = btn.textContent;
            var computerChoice = getComputerChoice();
            const audio = document.querySelector(`audio[data-key=trex]`);
            audio.currentTime = 0;
            audio.playbackRate = 2.0;
            audio.play();
            playRound(playerChoice, computerChoice);
        })
);
