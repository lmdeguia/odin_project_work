
// document.querySelector(`.grid-cell[data-id="{x}"]`) where x:(1,...,9)

const n = 3;

const testPlayer1 = {marker: 'X', type: 'human', wins: 0, losses: 0, ties: 0};
const testPlayer2 = {marker: 'O', type: 'computer', wins: 0, losses: 0, ties: 0};

const firstPlayer = (Math.round(Math.random()) === 1) ? testPlayer1 : testPlayer2;


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
  let _filledCounter = 0; // if _filledCounter === n, game is a tie if no winner has been determined


// public
  const boardSize = n;

  // getters
  const gridCells = () => _gridCells;
  const filledCounter = () => _filledCounter;
  const gridMatrix = () => _gridMatrix;

  // setters
  function setFilledCounter(val){
    _filledCounter = val;
  }
  function incrCounter() {
    _filledCounter += 1;
  }

  // methods
  function fillCell (e) {
    const cellContents = e.target.textContent;
    if (cellContents === ''){
      e.target.textContent = gameController.currentMarker();
      incrCounter();
      gameController.switchMarkers();
    }}

  for (cell of _gridCells) {
    cell.addEventListener('click', fillCell);
  }


  return {
    boardSize,
    gridCells,
    gridMatrix,
    filledCounter,
    setFilledCounter,
    incrCounter,
    fillCell,
  }})()


// const player = (playerType, marker) => {

// }


const gameController = (() => {

//private
  let _currentMarker = firstPlayer.marker;
  const _clearBtn = document.querySelector('#clear');

  function clearBoard () {
    for (cell of gameBoard.gridCells()){
      cell.textContent = '';
      gameBoard.setFilledCounter(0);
      _currentMarker = firstPlayer.marker;
    }}

  _clearBtn.addEventListener('click', () => clearBoard());

//public
  // getters
  const currentMarker = () => _currentMarker;

  

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
    console.log('winner detected');
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
    console.log('winner detected');
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
    console.log('winner detected');
  }

  function boardChecker() {
    // tie
    if (gameBoard.filledCounter() === (gameBoard.boardSize)**2){
      console.log('game over');
      return;
    }
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
  }


  function switchMarkers() {
    const prevMarker = _currentMarker;
    _currentMarker = (prevMarker === 'X') ? 'O' : 'X';
    boardChecker();
  }

  return {
    currentMarker,
    switchMarkers,
    clearBoard,
  }
})()



