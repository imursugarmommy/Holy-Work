const playCourt = document.querySelector('.wrapper');
const bigFields = document.querySelectorAll('.wrapper > *');
const fields = document.querySelectorAll('.big-box > *');
let moves = 0;
let playerTurn = 'X';
let isGameOver = false;
let draw = false;
let p1Count = 0;
let p2Count = 0;
const p1CountHTML = document.querySelectorAll('.p1');
const p2CountHTML = document.querySelectorAll('.p2');

// Data structures for the big grids and mini-grids
let placeableMoves = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];

let miniGrids = [
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
];

const winningOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [3, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const statusText = document.querySelector('.win-info');
const popup = document.querySelector('.popup');
const restartBtn = document.querySelector('.restart');

const c = document.getElementById('stroke');
const ctx = c.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

gameStart();

function gameStart() {
  bigFields.forEach((bigField, bigCellIndex) => {
    bigField.addEventListener('click', (e) => {
      if (isGameOver) {
        return;
      }

      // Getting the indexes of the clicked big grid and mini-grid
      const cellIndex = e.target.getAttribute('cellIndex');
      const clickedBigCell = e.target;

      // Checking if the clicked big cell is valid
      if (cellIndex != null) {
        const currentPlacedMovesLocation = placeableMoves[bigCellIndex];

        // Updating the current big grid and mini-grid
        changePlayer();
        currentPlacedMovesLocation[cellIndex] = playerTurn;
        const currentMiniGrid = miniGrids[bigCellIndex];
        const [rowIndex, colIndex] = getMiniGridCellIndex(cellIndex);
        currentMiniGrid[rowIndex][colIndex] = playerTurn;
        changePlayer();

        // Removing click class and enabling other big cells
        clickedBigCell.classList.remove('clicked');
        bigFields[cellIndex].classList.add('clicked');
      }

      // Disabling clicks on unselected big cells
      bigFields.forEach((court) => {
        if (!court.classList.contains('clicked')) {
          court.style.pointerEvents = 'none';
        }
      });
    });
  });

  fields.forEach((field, bigCellIndex) => {
    field.addEventListener('click', (e) => {
      if (isGameOver) {
        return;
      }

      const cellIndex = e.target.getAttribute('cellIndex');
      if (cellIndex != null) {
        const currentPlacedMovesLocation = placeableMoves[bigCellIndex];
        const currentMiniGrid = miniGrids[bigCellIndex];
        const [rowIndex, colIndex] = getMiniGridCellIndex(cellIndex);

        if (
          currentPlacedMovesLocation[cellIndex] === '' &&
          currentMiniGrid[rowIndex][colIndex] === ''
        ) {
          changePlayer();
          currentPlacedMovesLocation[cellIndex] = playerTurn;
          currentMiniGrid[rowIndex][colIndex] = playerTurn;
          field.innerText = playerTurn;

          checkWinner(bigCellIndex); // Check for a winner in the mini-grid
        }
      }
    });
  });
}

function getMiniGridCellIndex(cellIndex) {
  // Convert cellIndex to rowIndex and colIndex within a 3x3 mini-grid
  const rowIndex = Math.floor(cellIndex / 3);
  const colIndex = cellIndex % 3;
  return [rowIndex, colIndex];
}

function checkWinner(bigCellIndex) {
  const currentMiniGrid = miniGrids[bigCellIndex];

  for (let i = 0; i < winningOptions.length; i++) {
    const conditions = winningOptions[i];

    const cellA = currentMiniGrid[conditions[0][0]][conditions[0][1]];
    const cellB = currentMiniGrid[conditions[1][0]][conditions[1][1]];
    const cellC = currentMiniGrid[conditions[2][0]][conditions[2][1]];

    if (cellA === cellB && cellB === cellC && cellA !== '') {
      const winningfield1 = fields[conditions[0]];
      const winningfield2 = fields[conditions[1]];
      const winningfield3 = fields[conditions[2]];

      // highlight winning fields
      winningfield1.style.background = 'var(--highlight)';
      winningfield2.style.background = 'var(--highlight)';
      winningfield3.style.background = 'var(--highlight)';

      const centerA = getCenterPosition(winningfield1);
      const centerB = getCenterPosition(winningfield3);

      // check which field has just won, and place their symbol above field
      // placeMoveInBigGrid();

      checkBigGridWinner();
      return;
    }
  }

  // Check for a draw in the mini-grid
  let isDraw = true;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (currentMiniGrid[row][col] === '') {
        isDraw = false;
        break;
      }
    }
  }

  if (isDraw) {
    // remove all marks in this field
  }

  if (roundWon) {
    isGameOver = true;
    statusText.innerText = `${playerTurn} wins!`;

    if (playerTurn === 'X') {
      p1Count++;
    } else if (playerTurn === 'O') {
      p2Count++;
    }

    p1CountHTML.forEach((count) => {
      count.innerHTML = p1Count;
    });
    p2CountHTML.forEach((count) => {
      count.innerHTML = p2Count;
    });
  }

  if (isGameOver) {
    popup.style.display = 'flex';
    restartBtn.style.display = 'block';
  }

  checkBigGridWinner();
}

function checkBigGridWinner() {
  // Add your code here to check for a winner in the big grid
  // You can use the placeableMoves array and the winningOptions for big grids
  // Update isGameOver, draw, and statusText accordingly
}

function getCenterPosition(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
}

function changePlayer() {
  if (playerTurn === 'X') {
    playerTurn = 'O';
  } else if (playerTurn === 'O') {
    playerTurn = 'X';
  }
}
