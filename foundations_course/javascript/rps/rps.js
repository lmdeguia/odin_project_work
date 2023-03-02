const getComputerChoice = () => {
  const computerMapping = { 0: 'Rock', 1: 'Paper', 2: 'Scissors' };
  const randint = () => Math.floor(Math.random() * 3);
  return computerMapping[randint()];
};

let playerScore = 0;
let computerScore = 0;

const playerScoreVal = document.querySelector('#playerScore');
const computerScoreVal = document.querySelector('#computerScore');

function updateScore(winner) {
  if (winner === 'player') {
    playerScore += 1;
    playerScoreVal.textContent = `Player: ${playerScore}`;
  } else if (winner === 'computer') {
    computerScore += 1;
    computerScoreVal.textContent = `Computer:${computerScore}`;
  }
}

const playRound = (playerSelection, computerSelection) => {
  const container = document.querySelector('.container');

  const prevRoundtext = document.getElementById('temp');
  if (prevRoundtext) {
    prevRoundtext.remove();
  }

  const roundtext = document.createElement('p');
  roundtext.setAttribute('id', 'temp');
  roundtext.setAttribute('style', 'text-align: center;');
  const winMapping = { Rock: 'Scissors', Scissors: 'Paper', Paper: 'Rock' };

  if (playerSelection === computerSelection) {
    roundtext.textContent = 'Match is a draw!';
    container.appendChild(roundtext);
  } else if (winMapping[playerSelection] === computerSelection) {
    roundtext.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
    container.appendChild(roundtext);
    updateScore('player');
  } else if (winMapping[computerSelection] === playerSelection) {
    roundtext.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
    container.appendChild(roundtext);
    updateScore('computer');
  }
};

const playerChoices = Array.from(document.querySelectorAll('.choice'));
playerChoices.forEach(
  (btn) => btn.addEventListener(
    'click',
    () => {
      const playerChoice = btn.textContent;
      const computerChoice = getComputerChoice();
      const audio = document.querySelector('audio[data-key=trex]');
      audio.currentTime = 0;
      audio.playbackRate = 2.0;
      audio.play();
      playRound(playerChoice, computerChoice);
    },
  ),
);
