const n = 3;

// sleep function for robot choice
//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const Player = (type, marker) => {
  let wins = 0, losses = 0, ties = 0;
  return {type, marker, wins, losses, ties}
}
const Player1 = Player('human', 'X');
const Player2 = Player('human', 'O');
firstPlayer = (Player1.marker === 'X') ? Player1 : Player2;


const gameBoard = (() => {

// private
  function _genGridMatrix(grid) {
    let out = [], row = [], i = 0;
    for (item of grid){
        row.push(item);
        if ((i+1) % n === 0){
            out.push(row);
            row = [];
        }
        i += 1;
    }
    return out;
  }
  const _gridCells = document.querySelectorAll(".grid-cell");
  const _gridMatrix = _genGridMatrix(_gridCells);
  let _winnerDetected = false;
  let _filledCounter = 0; // if _filledCounter === n, game is a tie if no winner has been determined
  let _robotChoices = [...Array(n**2).keys()];

// public
  const boardSize = n;

  // getters
  const gridCells = () => _gridCells;
  const filledCounter = () => _filledCounter;
  const gridMatrix = () => _gridMatrix;
  const winnerDetected = () => _winnerDetected;
  const robotChoices = () => _robotChoices;

  // setters
  function setFilledCounter(val){
    _filledCounter = val;
  }

  function incrCounter() {
    _filledCounter += 1;
  }

  function setWinnerDetected(status) {
    _winnerDetected = status;
  }

  function setRobotChoices (idx=0, reset=false) {
    if (reset) {
      _robotChoices = [...Array(n**2).keys()];
    } else {
      _robotChoices.splice(idx, 1);
    }
  }

  // methods
  function congratWinner(currentPlayer) {
    const loser = (currentPlayer === Player1) ? Player2 : Player1;
    const msg = document.querySelector('#grid-heading');
    msg.classList.add('msg');
    msg.textContent = `${currentPlayer.marker} wins!`;
    loser.losses += 1, currentPlayer.wins += 1;
  }

  function robotLogic (robotMarker) {
    const robotChoice = _robotChoices[Math.floor(Math.random() * ((_robotChoices.length) - 0) + 0)];
    const cellChoice = document.querySelector(`.grid-cell[data-id="${robotChoice+1}"]`);
    cellChoice.textContent = robotMarker;
    incrCounter();
    _robotChoices.splice(_robotChoices.indexOf(robotChoice), 1);
    gameController.switchMarkers();
    if (_winnerDetected){
      setTimeout(() => {congratWinner(gameController.currentPlayer())}, 300);
    }
  }

  function fillCell (e) {
    if (gameController.currentPlayer().type !== 'human') {
      return;
    }
    const cellIndex = robotChoices().indexOf(+e.target.dataset['id']-1);
    const cellContents = e.target.textContent;
    if (cellContents === '' && !_winnerDetected){
      e.target.textContent = gameController.currentPlayer().marker;
      incrCounter();
      setRobotChoices(cellIndex);
      gameController.switchMarkers();
      if (_winnerDetected){
        setTimeout(() => {congratWinner(gameController.currentPlayer())}, 300);
      }
    }
  }

  for (cell of _gridCells) {
    cell.addEventListener('click', fillCell);
  }


  return {
    boardSize,
    gridCells,
    gridMatrix,
    winnerDetected,
    robotChoices,
    filledCounter,
    setFilledCounter,
    incrCounter,
    setWinnerDetected,
    setRobotChoices,
    robotLogic,
    fillCell,
  }})()


const gameController = (() => {

//private
  const _clearBtn = document.querySelector('#clear');
  let _currentPlayer = firstPlayer;
  

  function clearBoard () {
    const removeMsg = document.querySelector('#grid-heading');
    gameBoard.setWinnerDetected(false);
    gameBoard.setRobotChoices(0, true);
    for (cell of gameBoard.gridCells()){
      cell.textContent = '';
      gameBoard.setFilledCounter(0);
      _currentPlayer = firstPlayer;
    }
    if (removeMsg) {
      removeMsg.classList.remove('msg');
      removeMsg.textContent = 'Tic-Tac-Toe';
    }
    if (firstPlayer.type === 'robot') {
      setTimeout(() => {gameBoard.robotLogic(firstPlayer.marker);}, 500);
    }
  }


  _clearBtn.addEventListener('click', () => clearBoard());


//public
  // getters
  const currentPlayer = () => _currentPlayer;

  // setters
  const setCurrentPlayer = () => {
    _currentPlayer = firstPlayer;
  }

  // methods
  function rowChecker(row) {
    let currentCell = gameBoard.gridMatrix()[row][0].textContent;
    let check;
    for (let j = 0; j < gameBoard.boardSize; j++){
      check = gameBoard.gridMatrix()[row][j].textContent;
      if ( check !== currentCell || check === ''){
        return;
      }}
    // if not returned after for loop, winner is detected
    gameBoard.setWinnerDetected(true);
  }

  function colChecker(col) {
    let currentCell = gameBoard.gridMatrix()[0][col].textContent;
    let check;
    for (let i = 0; i < gameBoard.boardSize; i++){
      check = gameBoard.gridMatrix()[i][col].textContent;
      if (check !== currentCell || check === ''){
        return;
      }}
    // if not returned after for loop, winner is detected
    gameBoard.setWinnerDetected(true);
  }

  function diagChecker (r, c, type) {
    let [dr, dc] = (type === 0) ? [1, 1] : [1, -1];

    let currentCell = gameBoard.gridMatrix()[r][c].textContent;
    let check;
    for (let idx = 0; idx < gameBoard.boardSize; idx++){
      check = gameBoard.gridMatrix()[r][c].textContent;
      if (check !== currentCell || check === ''){
        return;
      }
      r += dr, c += dc;
    }
    gameBoard.setWinnerDetected(true);
  }

  function boardChecker() {
    // row checker
    for (let row = 0; row < gameBoard.boardSize; row++){
      rowChecker(row);
    }
    // col checker
    for (let col = 0; col < gameBoard.boardSize; col++){
      colChecker(col);
    }

    // diagonal checker
    let [d1r, d1c] = [0, 0];
    let [d2r, d2c] = [0, gameBoard.boardSize-1];
    diagChecker(d1r, d1c, 0);
    diagChecker(d2r, d2c, 1);

    // tie
    if (gameBoard.filledCounter() === (gameBoard.boardSize)**2 && !gameBoard.winnerDetected()){
      const msg = document.querySelector('#grid-heading');
      msg.classList.add('msg');
      msg.textContent = `It's a tie!`;
      Player1.ties += 1, Player2.ties += 1;
      return;
    }
  }

  async function switchMarkers() {
    boardChecker();
    if (gameBoard.winnerDetected()){return;}
    const prevPlayer = _currentPlayer;
    _currentPlayer = (prevPlayer === Player1) ? Player2 : Player1;
    if (_currentPlayer.type === 'robot' && !gameBoard.winnerDetected()){
      await sleep(1000);
      gameBoard.robotLogic(_currentPlayer.marker);
    }
  }

  return {
    currentPlayer,
    switchMarkers,
    clearBoard,
    setCurrentPlayer,
  }
})()





// modal menu

let startFlag = true;

const icon = document.querySelector('.fa');
const form = document.querySelector('.menu');
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.modal');
const modalCanvas = document.querySelector('.modal-canvas');

icon.onclick = function () {
  modalCanvas.style.display = 'block';
  modal.classList.add('active');
};

// menu options

const matchType = document.querySelector('#matchType');
const playerChoice = document.querySelector('#playerChoice');
const difficulty = document.querySelector('#difficulty');
const modalTitle = document.querySelector('#modal-title')
const welcomeMsg = document.querySelector('#welcome-msg');

let currentMatchType = 'Player vs. Player';
let currentChoice = 'X';
let currentDifficulty = 'Easy';

const matchConditions = () => {
  if (matchType.value === 'Player vs. Computer'){
    playerChoice.disabled = false;
    difficulty.disabled = false;
  } else if (matchType.value === 'Player vs. Player') {
    playerChoice.disabled = true;
    difficulty.disabled = true;
  }
};


closeBtn.onclick = function () {
  if (!startFlag){
    matchType.value = currentMatchType;
    playerChoice.value = currentChoice;
    difficulty.value = currentDifficulty;
    matchConditions();
    modal.classList.remove('active');
    modalCanvas.style.display = 'none';
  }
  return false;
};


matchType.addEventListener('change', 
    (e) => {
      e.preventDefault();
      matchConditions();
    });



form.addEventListener('submit', 
    (e) => {
      e.preventDefault();

      welcomeMsg.hidden = true;
      closeBtn.hidden = false;
      if (matchType.value === 'Player vs. Computer'){
        Player1.marker = playerChoice.value;
        Player2.type = 'robot';
        Player2.marker = (Player1.marker === 'X') ? 'O' : 'X';
        currentMatchType = 'Player vs. Computer';
      } else if (matchType.value === 'Player vs. Player'){
        Player2.type = 'human';
        currentMatchType = 'Player vs. Player';
      }
      modal.classList.remove('active');
      modalCanvas.style.display = 'none';

      if (!startFlag){
        firstPlayer = (Player1.marker === 'X') ? Player1 : Player2;
        gameController.clearBoard();
      }
      
      if (startFlag){
        modalTitle.textContent = "Settings";
        firstPlayer = (Player1.marker === 'X') ? Player1 : Player2;
        gameController.setCurrentPlayer();
        startFlag = false;
        if (firstPlayer.type === 'robot') {
          setTimeout(() => {gameBoard.robotLogic(firstPlayer.marker);}, 500);
        }
  
      }
    })


// sidenav

function openNav() {
  document.getElementById("mySidenav").style.width = "400px";
  modalCanvas.style.display = 'block';
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  modalCanvas.style.display = 'none';
}